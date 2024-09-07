import { SupabaseBrowserClient } from '@utils/supabase/client';
import { Profile } from './types/manga.types';

export async function getUpdatedMangasAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('*', { count: 'exact' })
    .match({ profile_id: userId, is_updated: true, is_following: true });

  return count ?? 0;
}

export async function getCurrentlyReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ profile_id: userId, reading_status: 'reading' });
  return count ?? 0;
}
