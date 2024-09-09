'use server';

import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { FormActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';
import { editMangaAttributesSchema } from './edit-manga-attributes-schema';
import { isAdmin } from '@utils/utils';

export async function editMangaAttributesAction(formData: FormData, mangaId: string) {
  const { supabase, user } = await createServerClient();

  if (!isAdmin(user?.email)) {
    return { success: false, error: 'NOT_SINGED_IN_AS_ADMIN_ERROR' } satisfies Awaited<FormActionResult>;
  }

  const { data, error } = editMangaAttributesSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { success: false, error: error.issues } satisfies Awaited<FormActionResult>;
  }

  {
    const { error } = await supabase
      .from('manga')
      .update({
        title: data['title'],
        image_url: data['image-url'],
        manga_status: data['manga-status'],
        latest_chapter: data['latest-chapter'],
        check_every_number: data['check-every-number'],
        check_every_period: data['check-every-period'],
      })
      .match({ id: mangaId });

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
    }
  }

  revalidatePath('/');
  return { success: true } satisfies Awaited<FormActionResult>;
}
