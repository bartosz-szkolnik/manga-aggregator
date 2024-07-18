import { NotificationsSwitch } from '@lib/sending-notifications/notifications-switch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings · Manga Aggregator',
};

export default async function SettingsPage() {
  return (
    <main className="px-4 py-6 lg:px-8">
      <NotificationsSwitch />
    </main>
  );
}
