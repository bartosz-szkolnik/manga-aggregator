import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { Profile as ProfileType } from '@lib/types/manga.types';
import { LogIn, UserPlus } from 'lucide-react';

export function Profile({ profile, email }: { profile: ProfileType; email: string }) {
  return (
    <div className="flex h-[40px] items-center space-x-4">
      <Avatar>
        <AvatarImage src={profile.avatar_url || '/avatars/03.png'} />
        <AvatarFallback>{profile.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col justify-around">
        <p className="text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
          Hey, {profile.name || 'Manga reader'}
        </p>
        <p className="w-full truncate text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

export function ProfileFallback() {
  return (
    <div className="flex gap-4">
      <Button className="w-full" variant="default" asChild>
        <Link href="/auth/sign-in">
          <LogIn className="mr-2" />
          Sign in
        </Link>
      </Button>
      <Button className="w-full" variant="default" asChild>
        <Link href="/auth/sign-up">
          <UserPlus className="mr-2" />
          Sign up
        </Link>
      </Button>
    </div>
  );
}
