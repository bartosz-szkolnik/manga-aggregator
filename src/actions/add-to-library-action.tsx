'use server';

import { Manga } from '../components/manga-artwork';
import { createServerClient } from '../utils/supabase';

export async function addToLibraryAction(mangaId: Manga['id']) {
  const { supabase, user } = await createServerClient();
  if (!user) {
    return;
  }

  await supabase.from('profile_manga').insert({ profile_id: user.id, manga_id: mangaId });
}
