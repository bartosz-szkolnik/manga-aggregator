import { ServerError } from '@components/common/error/error.server';
import { Separator } from '@components/ui/separator';
import { NotificationsSwitch, SingularNotificationsSwitch } from '@settings/components/sending-notifications';
import { fetchNotificationsData } from '@settings/lib/notifications/data';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Notifications Settings' };

export default async function NotificationsSettingsPage() {
  const { data, error } = await fetchNotificationsData();

  if (error) {
    return <ServerError error={error} />;
  }

  const isUnsubscribed = JSON.stringify(data.subscriptions) === '[]';
  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive your notifications.</p>
      </div>
      <Separator className="my-4" />
      <NotificationsSwitch defaultSubscribed={!isUnsubscribed} />
      <SingularNotificationsSwitch receiveSingularNotifications={data?.receiveSingularNotifications ?? true} />
    </main>
  );
}
