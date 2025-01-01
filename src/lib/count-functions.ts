import { SupabaseBrowserClient } from '@utils/supabase/client';
import { Profile } from '@manga/types';

export async function getUpdatedMangasCount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('*', { count: 'exact' })
    .match({ profile_id: userId, is_updated: true, is_following: true });

  return count ?? 0;
}

export async function getCurrentlyReadCount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ profile_id: userId, reading_status: 'reading' });
  return count ?? 0;
}

export async function getAllMangaInUserLibraryCount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ profile_id: userId, is_in_library: true });
  return count ?? 0;
}

export async function getAllMangaCount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase.from('manga').select('', { count: 'exact' });
  return count ?? 0;
}
