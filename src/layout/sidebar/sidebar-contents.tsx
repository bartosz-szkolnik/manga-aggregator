import { Profile, ProfileFallback } from '@components/profile/profile';
import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database/add-manga-to-database-dialog';
import { User } from '@supabase/supabase-js';
import { Profile as ProfileType } from '@manga/types';
import { SignOutButton } from '@auth/sign-out';
import { NavigationLink } from './navigation/navigation-link';

type SidebarContentsProps = {
  user?: User | null;
  profile?: ProfileType | null;
};

export async function SidebarContents({ profile, user }: SidebarContentsProps) {
  if (!user || !profile) {
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
      <div className="flex gap-4">
        <AddMangaToDatabaseDialog className="w-full" />
        <SignOutButton className="w-full" />
      </div>
    </div>
  );
}

function Title() {
  return (
    <p className="tracking-light mb-6 mt-2 truncate px-4 text-center text-2xl text-[1.7rem] font-semibold">
      <NavigationLink href="/2048" className="cursor-default" usePlainNextLink>
        Manga Aggregator
      </NavigationLink>
    </p>
  );
}
