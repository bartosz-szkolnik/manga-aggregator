'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../lib/database.types';
import { cookies } from 'next/headers';
import { Manga } from './manga-artwork';

export async function addToLibraryAction(mangaId: Manga['id']) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }

  await supabase.from('profile_manga').insert({ profile_id: user.id, manga_id: mangaId });
}
