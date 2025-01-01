import { unauthorized } from '@auth/utils';
import { createServerClient } from '@utils/supabase/server';
import { propertiesToCamelCase } from '@utils/utils';

export async function fetchProfileData() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase.from('profile').select('username, name, avatar_url').eq('id', userId).single();
  if (error) {
    return { error };
  }

  return { data: propertiesToCamelCase(data) };
}
