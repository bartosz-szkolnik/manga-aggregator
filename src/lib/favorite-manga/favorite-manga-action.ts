'use server';

import { Manga } from '@lib/types/manga.types';
import { createServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function favoriteManga(mangaId: Manga['id'], isFavorite: boolean) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { error: 'You are not logged in' } as const;
  }

  const { data, error } = await supabase
    .from('profile_manga')
    .update({ is_favorite: !isFavorite })
    .match({ profile_id: userId, manga_id: mangaId });

  if (error) {
    return { error: 'Something went wrong' } as const;
  }

  revalidatePath('/home');
  return { success: data } as const;
}
