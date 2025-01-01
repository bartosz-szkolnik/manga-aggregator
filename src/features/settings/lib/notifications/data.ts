import { unauthorized } from '@utils/auth';
import { createServerClient } from '@utils/supabase/server';
import { propertiesToCamelCase } from '@utils/utils';

export async function fetchNotificationsData() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase
    .from('profile')
    .select('receive_singular_notifications, subscriptions')
    .eq('id', userId)
    .single();
  if (error) {
    return { error };
  }

  return { data: propertiesToCamelCase(data) };
}
