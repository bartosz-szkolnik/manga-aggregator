import { createServerClient } from '@utils/supabase/server';
import { unauthorized } from '@utils/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings · Manga Aggregator',
};

export default async function SettingsPage() {
  const { userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  return redirect('/settings/profile');
}
