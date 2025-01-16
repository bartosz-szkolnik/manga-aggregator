import { Separator } from '@components/ui/separator';
import { Metadata } from 'next';
import { fetchProfileData } from '@settings/lib/profile/data';
import { ProfileSettingsForm } from '@settings/components/update-profile-form';

export const metadata: Metadata = { title: 'Profile Settings' };

export default async function ProfileSettingsPage() {
  const { data, error } = await fetchProfileData();
  if (error) {
    return <p>Some kind of error occured...</p>;
  }

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <ProfileSettingsForm name={data.name ?? ''} profileUrl={data.avatarUrl ?? ''} />
    </main>
  );
}
