import { Manga } from '@manga/types';
import { createServerClient } from '@utils/supabase/server';

export async function fetchMangaDetails(mangaId: Manga['id']) {
  const { supabase } = await createServerClient();
  const { data, error } = await supabase.from('manga').select('title').eq('id', mangaId).single();

  if (error) {
    return { error: new Error(`Couldn't find a Manga with this ID.`) };
  }

  return { data };
}
