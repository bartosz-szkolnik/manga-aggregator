'use server';

import { MangadexCover } from '../lib/mangadex-cover.types';
import { Mangadex } from '../lib/mangadex.types';
import { createServerClient } from '../utils/supabase';

export async function addMangaAction(formData: FormData) {
  const { supabase } = await createServerClient();

  const url = formData.get('url') as string | null;
  if (!url) {
    return;
  }

  const id = getId(url);
  const { data } = await supabase.from('manga').select('mangadex_id').eq('mangadex_id', id).maybeSingle();
  if (data) {
    return { error: 'ALREADY IN DATABASE' } as const;
  }

  const [mangaData, coverData] = await Promise.all([
    fetch(`https://api.mangadex.org/manga/${id}`).then(r => r.json()) as Promise<Mangadex>,
    fetch(
      `https://api.mangadex.org/cover?limit=10&manga%5B%5D=${id}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc`,
    ).then(r => r.json()) as Promise<MangadexCover>,
  ]);

  const { error } = await supabase.from('manga').insert({
    mangadex_id: id,
    title: mangaData.data.attributes.title.en,
    image_url: `https://mangadex.org/covers/${id}/${coverData.data[0].attributes.fileName}`,
  });

  if (error) {
    console.error(error);
  }
}

function getId(url: string) {
  const parts = url.split('/');
  return parts[4];
}
