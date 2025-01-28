import { unauthorized } from '@auth/utils';
import { createServerClient } from '@utils/supabase/server';

export async function fetchMangasReadCount() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'finished reading', profile_id: userId });
  return count;
}

export async function fetchMangasPlannedToReadCount() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'want to read', profile_id: userId });
  return count;
}
