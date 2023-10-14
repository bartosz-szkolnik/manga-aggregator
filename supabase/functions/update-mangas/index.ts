import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '../../../src/lib/database.types.ts';

// needs refactor

type ChapterResponse = {
  result: 'ok';
  response: 'collection';
  data: {
    id: string;
    attributes: {
      chapter: string;
      title: string | null;
    };
  }[];
};

Deno.serve(async req => {
  const client = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
    },
  );

  const { data, error } = await client.from('manga').select('mangadex_id');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  const mangasToUpdate: { mangaId: string; chapterData: ChapterResponse['data'] }[] = [];
  for (const id of data.map(el => el.mangadex_id)) {
    const data = await getLatestMangaChapter(id, '2023-10-01T00:00:00');

    if (data.length) {
      mangasToUpdate.push({ mangaId: id, chapterData: data });
    }
  }

  for (const { mangaId, chapterData } of mangasToUpdate) {
    const { error } = await client
      .from('manga')
      .update({ latest_chapter_no: chapterData[0].attributes.chapter })
      .eq('mangadex_id', mangaId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }

  for (const { mangaId, chapterData } of mangasToUpdate) {
    const { data } = await client
      .from('manga')
      .select('title, profile_manga(latest_chapter_read, is_following, profile(subscriptions))')
      .eq('mangadex_id', mangaId)
      .single();
    const { title, profile_manga } = data!;

    for (const pm of profile_manga) {
      // check later the condition
      if (pm.is_following && (pm.latest_chapter_read ?? 0) !== chapterData[0].attributes.chapter) {
        const subs = (pm.profile?.subscriptions ?? []) as Array<Json>;
        for (const sub of subs) {
          // check if can use upsert
          const { error } = await client.from('notifications').insert({
            subscription: sub,
            data: {
              mangaName: title,
              mangaId: mangaId,
            },
          });

          if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
              headers: { 'Content-Type': 'application/json' },
              status: 500,
            });
          }
        }
      }
    }
  }

  return new Response(JSON.stringify({ message: 'Mangas updated.' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});

async function getLatestMangaChapter(mangaId: string, updatedAtSince: string) {
  const resp = await fetch(getUrl(mangaId, updatedAtSince));
  const data = await resp.json();
  return data.data as ChapterResponse['data'];
}

function getUrl(mangaId: string, updatedAtSince: string) {
  const params = new URLSearchParams({
    'limit': '1',
    'manga': mangaId,
    'translatedLanguage[]': 'en',
    'updatedAtSince': updatedAtSince,
  });

  return `https://api.mangadex.org/chapter?${params}`;
}
