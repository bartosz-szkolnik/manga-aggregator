import { createServerClient } from '@utils/supabase/server';
import { Profile, ProfileFallback } from '@components/profile/profile';
import { SignOutButton } from '@components/auth';
import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database/add-manga-to-database-dialog';

export async function SidebarContent() {
  const { supabase } = await createServerClient();
  // prettier-ignore
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    return (
      <div>
        <Title />
        <ProfileFallback />
      </div>
    );
  }

  const { data: profile } = await supabase.from('profile').select('*').eq('id', user?.id).single();
  if (!profile) {
    return (
      <div>
        <Title />
        <ProfileFallback />
      </div>
    );
  }

  return (
    <div>
      <Title />
      <Profile profile={profile} email={user.email ?? ''} />
      <Separator dir="horizontal" className="my-4 bg-slate-400" />
      <div className="flex justify-evenly gap-4">
        <AddMangaToDatabaseDialog className="w-full" />
        <SignOutButton className="w-full" />
      </div>
    </div>
  );
}

function Title() {
  return (
    <h1 className="tracking-light mb-6 mt-2 truncate px-4 text-center text-2xl text-[1.7rem] font-semibold">
      Manga Aggregator
    </h1>
  );
}
