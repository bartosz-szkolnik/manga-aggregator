import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { Profile as ProfileType } from '@lib/types/manga.types';

export function Profile({ profile, email }: { profile: ProfileType; email: string }) {
  return (
    <div className="flex h-[40px] items-center space-x-4">
      <Avatar>
        <AvatarImage src={profile.avatar_url ?? '/avatars/03.png'} />
        <AvatarFallback>{profile.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col justify-around">
        <p className="text-sm font-medium leading-none">Hey, {profile.name}</p>
        <p className="w-full truncate text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

export function ProfileFallback() {
  return (
    <Button className="m-2 w-full" variant={'default'} asChild>
      <Link href="/auth/sign-in">Sign in</Link>
    </Button>
  );
}
