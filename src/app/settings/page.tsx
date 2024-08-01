import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings · Manga Aggregator',
};

export default async function SettingsPage() {
  return redirect('/settings/profile');
}
