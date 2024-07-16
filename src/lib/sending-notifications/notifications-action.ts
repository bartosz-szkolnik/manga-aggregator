'use server';

import { Json } from '@lib/types/database.types';
import { createServerClient } from '@utils/supabase/server';
import { invariant } from '@utils/utils';

export async function subscribe(subscription: PushSubscriptionJSON) {
  const { supabase, userId } = await createServerClient();
  invariant(userId, 'No user id');

  const { data, error } = await supabase.from('profile').select('subscriptions').eq('id', userId).single();
  if (error) {
    throw error;
  }

  const subscriptions = data.subscriptions as Json[];
  await supabase
    .from('profile')
    .update({ subscriptions: [...subscriptions, subscription as Json] })
    .eq('id', userId)
    .single();
}

export async function revokeSubscription(endpoint: string) {
  const { supabase, userId } = await createServerClient();
  invariant(userId, 'No user id');

  const { data, error } = await supabase.from('profile').select('subscriptions').eq('id', userId).single();
  if (error) {
    throw error;
  }

  const subs = data.subscriptions as { endpoint: string }[];
  const subscriptions = subs.filter(sub => sub.endpoint !== endpoint);
  await supabase.from('profile').update({ subscriptions }).eq('id', userId).single();
}
