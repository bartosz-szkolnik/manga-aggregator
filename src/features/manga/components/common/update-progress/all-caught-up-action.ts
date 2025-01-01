'use server';

import { Manga } from '@manga/types';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { ActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';

export async function allCaughtUp(mangaId: Manga['id']) {
  const { supabase, userId } = await createServerClient();

  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { error, data: profileManga } = await supabase
    .from('profile_manga')
    .select('reading_status, manga(latest_chapter, manga_status)')
    .match({ profile_id: userId, manga_id: mangaId })
    .single();

  if (error || !profileManga.manga) {
    logger.error(error);
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  const { manga, reading_status } = profileManga;
  const isCompleted = manga.manga_status === 'completed';
  {
    const { error } = await supabase
      .from('profile_manga')
      .update({
        latest_chapter_read: manga.latest_chapter,
        reading_status: isCompleted ? 'finished reading' : reading_status,
        is_updated: false,
      })
      .match({ profile_id: userId, manga_id: mangaId });

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
    }
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<ActionResult>;
}
