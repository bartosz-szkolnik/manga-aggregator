'use server';

import { Manga } from '@lib/types/manga.types';
import { createServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function allCaughtUp(mangaId: Manga['id']) {
  const { supabase, userId } = await createServerClient();

  const { error, data: profileManga } = await supabase
    .from('profile_manga')
    .select('current_reading_status, manga(latest_chapter, manga_status)')
    .match({ profile_id: userId, manga_id: mangaId })
    .single();
  if (error || !profileManga.manga) {
    return { error };
  }

  const { manga, current_reading_status } = profileManga;
  const isCompleted = manga.manga_status === 'completed';

  {
    const { error } = await supabase
      .from('profile_manga')
      .update({
        latest_chapter_read: manga.latest_chapter,
        current_reading_status: isCompleted ? 'finished reading' : current_reading_status,
      })
      .match({ profile_id: userId, manga_id: mangaId });

    if (error) {
      return { error };
    }
  }

  revalidatePath('/home');
  return { data: 'Success!' };
}