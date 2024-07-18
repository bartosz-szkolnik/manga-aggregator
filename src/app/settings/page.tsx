import { NotificationsSwitch } from '@lib/sending-notifications/notifications-switch';

export default async function SettingsPage() {
  return (
    <main className="px-4 py-6 lg:px-8">
      <NotificationsSwitch />
    </main>
  );
}
