'use server';

import { Json } from '@manga/types';
import { createServerClient } from '@utils/supabase/server';
import { ActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';

export async function subscribe(subscription: PushSubscriptionJSON) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { data, error } = await supabase.from('profile').select('subscriptions').eq('id', userId).single();
  if (error) {
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  {
    const subscriptions = data.subscriptions as Json[];
    const { error } = await supabase
      .from('profile')
      .update({ subscriptions: [...subscriptions, subscription as Json] })
      .eq('id', userId)
      .single();

    if (error) {
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
    }
  }
  return { success: true } satisfies Awaited<ActionResult>;
}

export async function revokeSubscription(endpoint: string) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { data, error } = await supabase.from('profile').select('subscriptions').eq('id', userId).single();
  if (error) {
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  {
    const subs = data.subscriptions as { endpoint: string }[];
    const subscriptions = subs.filter(sub => sub.endpoint !== endpoint);

    const { error } = await supabase.from('profile').update({ subscriptions }).eq('id', userId).single();
    if (error) {
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
    }
  }
  return { success: true } satisfies Awaited<ActionResult>;
}

export async function setReceivingSingularNotificationsTo(value: boolean) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<ActionResult>;
  }

  const { error } = await supabase.from('profile').update({ receive_singular_notifications: value }).eq('id', userId);

  if (error) {
    return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<ActionResult>;
  }

  revalidatePath('/settings/notifications');
  return { success: true } satisfies Awaited<ActionResult>;
}
