'use server';

import { Manga } from '@lib/types/manga.types';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { ActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';

export async function removeMangaFromDatabase(mangaId: Manga['id']) {
  const { supabase, profile } = await createServerClient();
  if (profile?.role !== 'admin') {
    return { success: false, error: 'NOT_SINGED_IN_AS_ADMIN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { error } = await supabase.from('manga').delete().match({ id: mangaId });
  if (error) {
    logger.error(error);
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  revalidatePath('/dashboard');
  return { success: true } satisfies Awaited<ActionResult>;
}
