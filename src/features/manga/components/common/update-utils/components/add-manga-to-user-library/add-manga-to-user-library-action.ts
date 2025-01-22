'use server';

import { Manga } from '@manga/types';
import { setRefetchMangaUseCookieToTrue } from '@manga/utils/refetch-manga/refetch-manga.server';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { ActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';

export async function addToUserLibrary(mangaId: Manga['id'], isInLibrary: boolean, setCookie?: boolean) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ profile_id: userId, manga_id: mangaId });

  if (Number(count) > 0) {
    const { error } = await supabase
      .from('profile_manga')
      .update({ is_in_library: !isInLibrary })
      .match({ profile_id: userId, manga_id: mangaId });

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
    }
  } else {
    const { error } = await supabase.from('profile_manga').insert({
      profile_id: userId,
      manga_id: mangaId,
      reading_status: 'want to read',
      is_in_library: true,
      is_following: false,
      is_favorite: false,
    });

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
    }
  }

  if (setCookie) {
    await setRefetchMangaUseCookieToTrue();
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<ActionResult>;
}
