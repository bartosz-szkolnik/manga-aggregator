import { createServerClient } from '@utils/supabase/server';
import { propertiesToCamelCase } from '@utils/utils';

export async function fetchSidebarData() {
  const { supabase, userId, profile } = await createServerClient();
  // prettier-ignore
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return { error };
  }

  return { userId, profile: propertiesToCamelCase(profile), user };
}
