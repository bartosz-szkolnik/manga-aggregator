'use server';

import { Manga } from '@manga/types';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { ActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';

export async function favoriteManga(mangaId: Manga['id'], isFavorite: boolean) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { error } = await supabase
    .from('profile_manga')
    .update({ is_favorite: !isFavorite })
    .match({ profile_id: userId, manga_id: mangaId });

  if (error) {
    logger.error(error);
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<ActionResult>;
}
