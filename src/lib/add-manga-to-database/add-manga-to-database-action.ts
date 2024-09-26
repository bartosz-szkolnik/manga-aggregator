'use server';

import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { MangaDexCoverResponse } from '@type/mangadex-cover.types';
import { MangaAttributes, MangaDexResponse } from '@type/mangadex.types';
import {
  addMangaToDatabaseProfileMangaDataSchema,
  addMangaToDatabaseMangaDataSchema,
  addMangaToDatabaseMangaIdSchema,
} from './add-manga-to-database-schema';
import { ZodIssue } from 'zod';
import { logger } from '@utils/server/logger';
import { PostgrestError } from '@supabase/supabase-js';
import { MangaDexChapterResponse } from '@lib/types/mangadex-chapter.types';
import { MangaStatus } from '@lib/types/manga.types';
import {
  AddMangaToDatabaseState,
  ErrorState,
  MangaDataCloseModalState,
  MangaDataState,
  MangaIdState,
  ProfileMangaDataState,
  ProfileMangaDataSuccessState,
} from './add-manga-to-database-state';
import { revalidatePath } from 'next/cache';

export async function addMangaToDatabase(previousState: AddMangaToDatabaseState, formData: FormData) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { type: 'MANGA_ID', error: 'NOT_SIGNED_IN_ERROR' } satisfies MangaIdState;
  }

  switch (previousState.type) {
    case 'MANGA_ID': {
      return tryToRun(previousState, async () => {
        const { mangaId } = parseMangaId(formData);

        if (await checkIfMangaIsAlreadyInTheDatabase(supabase, mangaId)) {
          return { type: 'MANGA_ID', error: 'MANGA_ALREADY_IN_DATABASE' } satisfies MangaIdState;
        }

        const [mangaAttributes, mangaCover, mangaLatestChapter] = await Promise.all([
          getMangaAttributes(mangaId),
          getMangaCover(mangaId),
          getMangaLatestChapter(mangaId),
        ]);

        return {
          type: 'MANGA_DATA',
          error: null,
          data: { mangaId, mangaAttributes, mangaCover, mangaLatestChapter },
        } satisfies MangaDataState;
      });
    }

    case 'MANGA_DATA': {
      return tryToRun(previousState, async () => {
        const isBack = formData.get('back');
        if (isBack) {
          return { type: 'MANGA_ID', error: null } satisfies MangaIdState;
        }

        const data = previousState.data;
        const parsedData = parseMangaData(formData);
        const addedMangaId = await insertMangaToDatabase(supabase, parsedData, data);

        const isClose = formData.get('close');
        revalidatePath('/');
        if (isClose) {
          return { type: 'MANGA_DATA_CLOSE_MODAL' } satisfies MangaDataCloseModalState;
        }

        return {
          type: 'PROFILE_MANGA_DATA',
          data: { addedMangaId, mangaLatestChapter: data.mangaLatestChapter, mangaStatus: data.mangaAttributes.status },
          error: null,
        } satisfies ProfileMangaDataState;
      });
    }

    case 'PROFILE_MANGA_DATA': {
      return tryToRun(previousState, async () => {
        const { addedMangaId } = previousState.data;

        const data = parseProfileMangaData(formData);
        await insertProfileMangaToDatabase(supabase, userId, addedMangaId, data);
        revalidatePath('/');
        return { type: 'PROFILE_MANGA_DATA_SUCCESS', error: null } satisfies ProfileMangaDataSuccessState;
      });
    }
    default: {
      return { type: 'ERROR', error: 'SOMETHING_WENT_WRONG' } satisfies ErrorState;
    }
  }
}

////////////////////////
// Database functions //
////////////////////////

async function insertMangaToDatabase(
  supabase: SupabaseServerClient,
  parsedData: ReturnType<typeof parseMangaData>,
  mangaData: MangaDataState['data'],
) {
  const { checkEveryNumber, checkEveryPeriod } = parsedData;
  const { mangaAttributes, mangaCover, mangaId, mangaLatestChapter } = mangaData;
  const { error, data } = await supabase
    .from('manga')
    .insert({
      mangadex_id: mangaId,
      title: mangaAttributes.title.en ?? mangaAttributes.title['ja-ro'],
      image_url: `https://mangadex.org/covers/${mangaId}/${mangaCover}`,
      latest_chapter: mangaLatestChapter.chapter,
      last_time_checked: new Date().toISOString(),
      description: mangaAttributes.description.en ?? 'No description available...',
      manga_status: toMangaStatus(mangaAttributes.status),
      check_every_number: checkEveryNumber,
      check_every_period: checkEveryPeriod,
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
  parsedData: ReturnType<typeof parseProfileMangaData>,
) {
  const { addToFollowed, isFavorite, latestChapterRead, priority, readingStatus } = parsedData;
  const { error } = await supabase.from('profile_manga').insert({
    profile_id: userId,
    manga_id: mangaId,
    reading_status: readingStatus,
    is_in_library: true,
    is_following: addToFollowed,
    is_favorite: isFavorite,
    latest_chapter_read: latestChapterRead,
    priority,
  });

  if (error) {
    throw error;
  }
}

/////////////////////
// Fetch functions //
/////////////////////

async function checkIfMangaIsAlreadyInTheDatabase(supabase: SupabaseServerClient, id: string) {
  const { data, error } = await supabase.from('manga').select('mangadex_id').eq('mangadex_id', id).maybeSingle();
  return error ? error : data;
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

//////////////////////
// Parser functions //
//////////////////////

function parseMangaId(formData: FormData) {
  const { data, error } = addMangaToDatabaseMangaIdSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    throw error.issues;
  }

  return { mangaId: getId(data.url) };
}

function parseMangaData(formData: FormData) {
  const { data, error } = addMangaToDatabaseMangaDataSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    throw error.issues;
  }

  return {
    checkEveryNumber: data['check-every-number'],
    checkEveryPeriod: data['check-every-period'],
  };
}

function parseProfileMangaData(formData: FormData) {
  const { data, error } = addMangaToDatabaseProfileMangaDataSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    throw error.issues;
  }

  return {
    addToUserLibrary: toBoolean(data['add-to-user-library']),
    addToFollowed: toBoolean(data['start-following']),
    isFavorite: toBoolean(data['is-favorite']),
    priority: data['priority'],
    readingStatus: data['reading-status'],
    latestChapterRead: data['latest-chapter-read'],
  };
}

//////////////////////
// Helper functions //
//////////////////////

function tryToRun<T>(
  previousState: AddMangaToDatabaseState,
  fn: () => Promise<T>,
): Promise<T> | AddMangaToDatabaseState {
  try {
    return fn();
  } catch (e) {
    const error = e as PostgrestError | ZodIssue[];
    console.log('asdasdasd');
    if (!Array.isArray(error)) {
      logger.error(error);
      return { ...previousState, error: 'SOMETHING_WENT_WRONG' };
    }

    return { ...previousState, error };
  }
}

function getId(url: string) {
  const parts = url.split('/');
  return parts[4];
}

function toBoolean(value: string | null) {
  return value === 'on';
}

const values: MangaStatus[] = ['cancelled', 'completed', 'hiatus', 'ongoing', 'unknown'];

function toMangaStatus(value: string) {
  return isMangaStatus(value) ? value : 'unknown';
}

function isMangaStatus(value: string): value is MangaStatus {
  return values.includes(value as MangaStatus);
}
