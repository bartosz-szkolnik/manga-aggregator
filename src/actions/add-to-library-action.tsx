'use server';

import { Manga } from '../lib/types';
import { createServerClient } from '../utils/supabase';

export async function addToLibraryAction(mangaId: Manga['id']) {
  const { supabase, user } = await createServerClient();
  if (!user) {
    return;
  }

  const { data } = await supabase.from('profile_manga').select().eq('manga_id', mangaId).maybeSingle();
  if (data) {
    return { error: 'ALREADY IN LIBRARY' } as const;
  }

  await supabase.from('profile_manga').insert({ profile_id: user.id, manga_id: mangaId });
}
