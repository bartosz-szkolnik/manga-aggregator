'use server';

import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { MangaDexCoverResponse } from '@type/mangadex-cover.types';
import { MangaAttributes, MangaDexResponse } from '@type/mangadex.types';
import { z } from 'zod';
import { addMangaSchema } from './add-manga-schema';

export async function addManga(values: z.infer<typeof addMangaSchema>) {
  const { supabase, userId } = await createServerClient();

  const id = getId(values.url);
  if (await checkIfMangaIsAlreadyInTheDatabase(supabase, id)) {
    return { error: 'Manga is already in Database' } as const;
  }

  const [mangaAttributes, cover] = await Promise.all([getMangaAttributes(id), getMangaCover(id)]);
  const { error, addedMangaId } = await addMangaToDatabase(supabase, id, mangaAttributes, cover);

  if (error || !addedMangaId) {
    return { error: 'Something went wrong' } as const;
  }

  const addToUserLibrary = toBoolean(values['add-to-user-library']);
  const addToFollowed = toBoolean(values['start-following']);
  if (addToUserLibrary && addedMangaId && userId) {
    await addProfileMangaToDatabase(supabase, userId, addedMangaId, addToUserLibrary, addToFollowed);
  }

  revalidatePath('/home');
  return { success: addedMangaId } as const;
}

async function getMangaAttributes(id: string): Promise<MangaAttributes> {
  const response = await fetch(`https://api.mangadex.org/manga/${id}`);
  const { data } = (await response.json()) as MangaDexResponse;

  return data.attributes;
}

async function getMangaCover(id: string): Promise<string> {
  // prettier-ignore
  const response = await fetch(`https://api.mangadex.org/cover?limit=10&manga%5B%5D=${id}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc`);
  const { data } = (await response.json()) as MangaDexCoverResponse;

  return data[0].attributes.fileName;
}

async function addMangaToDatabase(
  supabase: SupabaseServerClient,
  id: string,
  mangaAttributes: MangaAttributes,
  cover: string,
) {
  const { error, data } = await supabase
    .from('manga')
    .insert({
      mangadex_id: id,
      title: mangaAttributes.title.en,
      image_url: `https://mangadex.org/covers/${id}/${cover}`,
    })
    .select('id')
    .single();

  return { error, addedMangaId: data?.id };
}

async function addProfileMangaToDatabase(
  supabase: SupabaseServerClient,
  userId: string,
  mangaId: string,
  addToUserLibrary: boolean,
  addToFollowed: boolean,
) {
  const { error } = await supabase.from('profile_manga').insert({
    profile_id: userId!,
    manga_id: mangaId,
    reading_status: 'want to read',
    is_in_library: addToUserLibrary,
    is_following: addToFollowed,
  });

  if (error) {
    console.error(error);
  }
}

async function checkIfMangaIsAlreadyInTheDatabase(supabase: SupabaseServerClient, id: string) {
  const { data } = await supabase.from('manga').select('mangadex_id').eq('mangadex_id', id).maybeSingle();
  return data;
}

function getId(url: string) {
  const parts = url.split('/');
  return parts[4];
}

function toBoolean(value: string | null) {
  return value === 'on';
}
