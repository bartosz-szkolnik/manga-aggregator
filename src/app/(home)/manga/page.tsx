import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Settings' };

export default async function SettingsPage() {
  return redirect('/manga/browse');
}
