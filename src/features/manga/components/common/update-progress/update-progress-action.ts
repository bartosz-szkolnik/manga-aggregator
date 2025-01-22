'use server';

import { logger } from '@utils/server/logger';
import { updateProgressSchema } from './update-progress-schema';
import { createServerClient } from '@utils/supabase/server';
import { FormActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';
import { setRefetchMangaUseCookieToTrue } from '@manga/utils/refetch-manga/refetch-manga.server';

export async function updateProgress(formData: FormData, mangaId: string, setCookie?: boolean) {
  const { supabase, userId } = await createServerClient();

  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<FormActionResult>;
  }

  const { data, error } = updateProgressSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { success: false, error: error.issues } satisfies Awaited<FormActionResult>;
  }

  {
    const { error } = await supabase
      .from('profile_manga')
      .update({
        reading_status: data['reading-status'],
        latest_chapter_read: data['latest-chapter-read'],
        priority: data['priority'],
        is_updated: false,
      })
      .match({ profile_id: userId, manga_id: mangaId });

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
    }
  }

  if (setCookie) {
    await setRefetchMangaUseCookieToTrue();
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<FormActionResult>;
}
