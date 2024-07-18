import { createServerClient } from '@utils/supabase/server';
import { Profile, ProfileFallback } from '@components/profile/profile';
import { SignOutButton } from '@components/auth';
import { Separator } from '@components/ui/separator';
import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';

export async function SidebarContent() {
  const { supabase } = await createServerClient();
  // prettier-ignore
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    return (
      <div>
        <h1 className="tracking-light mb-6 truncate px-4 text-center text-2xl font-semibold">Manga Aggregator</h1>
        <ProfileFallback />
      </div>
    );
  }

  const { data: profile } = await supabase.from('profile').select('*').eq('id', user?.id).single();
  if (!profile) {
    return (
      <div>
        <h1 className="tracking-light mb-6 truncate px-4 text-center text-2xl font-semibold">Manga Aggregator</h1>
        <ProfileFallback />
      </div>
    );
  }

  return (
    <div>
      <h1 className="tracking-light mb-6 truncate px-4 text-center text-2xl font-semibold">Manga Aggregator</h1>
      <Profile profile={profile} email={user.email ?? ''} />
      <Separator dir="horizontal" className="my-4 bg-slate-400" />
      <div className="flex justify-evenly gap-2">
        <AddMangaDialog className="w-full" />
        <SignOutButton className="w-full" />
      </div>
    </div>
  );
}
