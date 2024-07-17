import { sendSuccessResponse, type SupabaseBrowserClient, serveHandler, isTruthy } from '../_shared/common.ts';
import type { Json } from '../_shared/database.types.ts';

type MangaDexChapterResponse = {
  result: 'ok';
  response: 'collection';
  data: {
    id: string;
    type: 'chapter';
    attributes: {
      volume: null;
      chapter: string;
      title: string | null;
      translatedLanguage: string;
      externalUrl: string | null;
      publishAt: string;
      readableAt: string;
      createdAt: string;
      updatedAt: string;
      pages: number;
      version: number;
    };
  }[];
};

type MangasToUpdate = { mangaId: string; data: MangaDexChapterResponse['data'] }[];

Deno.serve(
  serveHandler(async client => {
    console.info('Starting the manga update process...');

    const mangaIds = await getMangaIds(client);
    const mangaDexIds = await getMangaDexIds(client, mangaIds);
    const mangasToUpdate = await retrieveNewChaptersFromMangaDex(mangaDexIds);

    await insertNewChapterData(client, mangasToUpdate);
    await scheduleNotifications(client, mangasToUpdate);
    console.info('Finished the manga update process...');

    return sendSuccessResponse('Mangas updated.');
  }),
);

/////////////////////
// Logic functions //
/////////////////////

async function getMangaIds(client: SupabaseBrowserClient) {
  console.info('Retrieving manga ids from database...');

  // TODO: add even more complicated logic to check if manga should be checked based on how often it should be checked
  const { data, error } = await client.from('profile_manga').select('manga_id').eq('is_following', true);
  if (error) {
    throw error;
  }

  const mangaIds = data.map(manga => manga.manga_id);
  return Array.from(new Set(mangaIds));
}

async function getMangaDexIds(client: SupabaseBrowserClient, mangaIds: string[]) {
  console.info('Retrieving mangadex ids from manga ids...');

  const idRetriever = async (id: string) => await client.from('manga').select('mangadex_id').eq('id', id).single();
  const mangaDexIds = await Promise.all(mangaIds.map(idRetriever));

  if (mangaDexIds.some(({ error }) => error)) {
    throw mangaDexIds.find(({ error }) => error)!.error;
  }

  return mangaDexIds.map(({ data }) => data!.mangadex_id);
}

async function retrieveNewChaptersFromMangaDex(mangaDexIds: string[]): Promise<MangasToUpdate> {
  console.info('Retrieving new chapters from mangadex...');

  const mangasToUpdate = await Promise.all(
    mangaDexIds.map(async id => {
      const data = await getLatestMangaChapter(id, '2024-04-20T00:00:00');
      return data.length ? { mangaId: id, data } : null;
    }),
  );

  return mangasToUpdate.filter(isTruthy);
}

async function insertNewChapterData(client: SupabaseBrowserClient, mangasToUpdate: MangasToUpdate) {
  console.info('Inserting new chapter data into database...');

  // prettier-ignore
  for (const { mangaId, data: [latestChapter] } of mangasToUpdate) {
    if (!latestChapter) {
      return;
    }

    const { error } = await client
      .from('manga')
      .update({ latest_chapter: latestChapter.attributes.chapter })
      .eq('mangadex_id', mangaId);

    if (error) {
      throw error;
    }
  }
}

function scheduleNotifications(client: SupabaseBrowserClient, mangasToUpdate: MangasToUpdate) {
  console.info('Inserting notifications to database to send later...');

  return Promise.all(
    mangasToUpdate.map(async ({ mangaId, data: [latestChapter] }) => {
      const { data, error } = await client
        .from('manga')
        .select('title, profile_manga(latest_chapter_read, is_following, profile(subscriptions))')
        .eq('mangadex_id', mangaId)
        .single();

      if (error) {
        throw error;
      }

      const { title, profile_manga } = data;
      return Promise.all(
        profile_manga
          .filter(({ is_following, latest_chapter_read }) => {
            return is_following && latest_chapter_read !== latestChapter.attributes.chapter;
          })
          .map(({ profile }) => {
            const subs = profile?.subscriptions as Json[];
            return insertNotifications(client, subs ?? [], title, mangaId);
          }),
      );
    }),
  );
}

//////////////////////
// Helper functions //
//////////////////////

async function getLatestMangaChapter(mangaId: string, updatedAtSince: string) {
  const resp = await fetch(getUrl(mangaId, updatedAtSince));
  const data = await resp.json();
  return data.data as MangaDexChapterResponse['data'];
}

function getUrl(mangaId: string, updatedAtSince: string) {
  const params = new URLSearchParams({
    limit: '1',
    manga: mangaId,
    updatedAtSince,
    'translatedLanguage[]': 'en',
    'order[createdAt]': 'desc',
  });

  return `https://api.mangadex.org/chapter?${params}`;
}

function insertNotifications(
  client: SupabaseBrowserClient,
  subscriptions: Array<Json>,
  title: string,
  mangaId: string,
) {
  return Promise.all(
    subscriptions.map(async sub => {
      // check if can use upsert, batched
      const { error, data } = await client.from('notifications').insert({
        subscription: sub,
        data: {
          mangaName: title,
          mangaId: mangaId,
        },
      });

      if (error) {
        throw error;
      }

      return data;
    }),
  );
}
