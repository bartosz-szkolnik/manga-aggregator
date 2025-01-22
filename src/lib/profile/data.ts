import { createServerClient } from '@utils/supabase/server';
import { propertiesToCamelCase } from '@utils/utils';

export async function fetchProfile() {
  const { profile } = await createServerClient();
  if (!profile) {
    return { profile: null };
  }

  return { profile: propertiesToCamelCase(profile) };
}
