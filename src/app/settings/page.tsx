import type { Json } from '@/src/lib/database.types';
import { createServerClient } from '@/src/utils/supabase';
import { NotificationsButton } from './notifications-button';

export default async function SettingsPage() {
  const subscribe = async (subscription: PushSubscriptionJSON) => {
    'use server';

    const { supabase, id } = await createServerClient();
    const { data } = await supabase.from('profile').select('subscriptions').eq('id', id!).single();

    const subscriptions = (data?.subscriptions as Json[]) ?? [];

    await supabase
      .from('profile')
      .update({ subscriptions: [...subscriptions, subscription as Json] })
      .eq('id', id!)
      .single();
  };

  const revokeSubscription = async (endpoint: string) => {
    'use server';

    const { supabase, id } = await createServerClient();
    const { data } = await supabase.from('profile').select('subscriptions').eq('id', id!).single();

    const subs = ((data?.subscriptions as Json[]) ?? []) as { endpoint: string }[];
    const subscriptions = subs.filter(sub => sub.endpoint !== endpoint);

    await supabase.from('profile').update({ subscriptions }).eq('id', id!).single();
  };

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings panel</h1>
        <p className="mt-2 text-sm text-muted-foreground">Do not break anything, ok? </p>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">Notifications</h2>
        <NotificationsButton subscribe={subscribe} revokeSubscription={revokeSubscription} />
      </div>
    </div>
  );
}
