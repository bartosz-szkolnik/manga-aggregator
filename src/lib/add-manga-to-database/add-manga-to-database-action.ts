'use server';

import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { MangaDexCoverResponse } from '@type/mangadex-cover.types';
import { MangaAttributes, MangaDexResponse } from '@type/mangadex.types';
import { addMangaToDatabaseSchema } from './add-manga-to-database-schema';
import { ZodIssue } from 'zod';
import { logger } from '@utils/server/logger';
import { PostgrestError } from '@supabase/supabase-js';
import { FormActionResult } from '@utils/types';
import { MangaDexChapterAttributes, MangaDexChapterResponse } from '@lib/types/mangadex-chapter.types';

export async function addMangaToDatabase(formData: FormData) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<FormActionResult>;
  }

  try {
    const { addToFollowed, addToUserLibrary, id, isFavorite } = parseFormData(formData);
    if (await checkIfMangaIsAlreadyInTheDatabase(supabase, id)) {
      return { success: false, error: 'MANGA_ALREADY_IN_DATABASE' } satisfies Awaited<FormActionResult>;
    }

    const [mangaAttributes, cover, chapterAttributes] = await Promise.all([
      getMangaAttributes(id),
      getMangaCover(id),
      getMangaLatestChapter(id),
    ]);
    const addedMangaId = await insertMangaToDatabase(supabase, id, mangaAttributes, cover, chapterAttributes);

    if (addToUserLibrary && addedMangaId) {
      await insertProfileMangaToDatabase(supabase, userId, addedMangaId, addToUserLibrary, addToFollowed, isFavorite);
    }
  } catch (e) {
    const error = e as PostgrestError | ZodIssue[];
    if (!Array.isArray(error)) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
    }

    return { success: false, error: error } satisfies Awaited<FormActionResult>;
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<FormActionResult>;
}

async function insertMangaToDatabase(
  supabase: SupabaseServerClient,
  id: string,
  mangaAttributes: MangaAttributes,
  cover: string,
  chapter: MangaDexChapterAttributes,
) {
  const { error, data } = await supabase
    .from('manga')
    .insert({
      mangadex_id: id,
      title: mangaAttributes.title.en ?? mangaAttributes.title['ja-ro'],
      image_url: `https://mangadex.org/covers/${id}/${cover}`,
      latest_chapter: chapter.chapter,
    })
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

async function insertProfileMangaToDatabase(
  supabase: SupabaseServerClient,
  userId: string,
  mangaId: string,
  addToUserLibrary: boolean,
  addToFollowed: boolean,
  isFavorite: boolean,
) {
  const { error } = await supabase.from('profile_manga').insert({
    profile_id: userId!,
    manga_id: mangaId,
    reading_status: 'want to read',
    is_in_library: addToUserLibrary,
    is_following: addToFollowed,
    is_favorite: isFavorite,
  });

  if (error) {
    throw error;
  }
}

async function checkIfMangaIsAlreadyInTheDatabase(supabase: SupabaseServerClient, id: string) {
  const { data, error } = await supabase.from('manga').select('mangadex_id').eq('mangadex_id', id).maybeSingle();
  if (error) {
    throw error;
  }

  return data;
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

async function getMangaLatestChapter(mangaId: string) {
  const params = new URLSearchParams({
    limit: '1',
    manga: mangaId,
    'translatedLanguage[]': 'en',
    'order[createdAt]': 'desc',
  });

  const response = await fetch(`https://api.mangadex.org/chapter?${params}`);
  const { data } = (await response.json()) as MangaDexChapterResponse;
  return data[0].attributes;
}

function parseFormData(formData: FormData) {
  const { data, error } = addMangaToDatabaseSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    throw error.issues;
  }

  return {
    id: getId(data.url),
    addToUserLibrary: toBoolean(data['add-to-user-library']),
    addToFollowed: toBoolean(data['start-following']),
    isFavorite: toBoolean(data['is-favorite']),
  };
}

function getId(url: string) {
  const parts = url.split('/');
  return parts[4];
}

function toBoolean(value: string | null) {
  return value === 'on';
}
