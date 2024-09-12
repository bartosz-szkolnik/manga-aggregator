import { createServerClient } from '@utils/supabase/server';
import { ProfileSettingsForm } from './profile-form';
import { Separator } from '@components/ui/separator';
import { Metadata } from 'next';
import { unauthorized } from '@utils/utils';

export const metadata: Metadata = {
  title: 'Profile Settings · Manga Aggregator',
};

export default async function ProfileSettingsPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase.from('profile').select('username, name, avatar_url').eq('id', userId).single();
  if (error) {
    return <p>Some kind of error occured...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <ProfileSettingsForm name={data.name ?? ''} profileUrl={data.avatar_url ?? ''} />
    </div>
  );
}
