import { Separator } from '@components/ui/separator';
import { NotificationsSwitch } from '@lib/sending-notifications/notifications-switch';
import { SingularNotificationsSwitch } from '@lib/sending-notifications/singular-notifications-switch';
import { createServerClient } from '@utils/supabase/server';
import { unauthorized } from '@utils/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications Settings · Manga Aggregator',
};

export default async function NotificationsSettingsPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase
    .from('profile')
    .select('receive_singular_notifications')
    .eq('id', userId)
    .single();

  if (error) {
    return <p>Some kind of error occured...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive your notifications.</p>
      </div>
      <Separator />
      <NotificationsSwitch />
      <SingularNotificationsSwitch receiveSingularNotifications={data?.receive_singular_notifications ?? true} />
    </div>
  );
}
