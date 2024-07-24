'use server';

import { z } from 'zod';
import { updateProgressSchema } from './update-progress-schema';
import { createServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProgress(values: z.infer<typeof updateProgressSchema>, mangaId: string) {
  const { supabase, userId } = await createServerClient();

  const { data, error } = await supabase
    .from('profile_manga')
    .update({
      reading_status: values['reading-status'],
      latest_chapter_read: values['latest-chapter-read'],
      priority: values['priority'],
    })
    .match({ profile_id: userId, manga_id: mangaId });

  if (error) {
    return { error };
  }

  revalidatePath('/');
  return { success: data };
}
