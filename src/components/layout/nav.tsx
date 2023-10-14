import { Link } from '../ui/link';
import { createServerClient } from '@/src/utils/supabase';
import { Search } from './nav/search';
import { UserNav } from './nav/user-nav';
import { MainNav } from './nav/main-nav';
import { buttonVariants } from '../ui/button';
import { DarkModeToggle } from './nav/dark-mode-toggle';

export async function Nav() {
  const { isLoggedIn, supabase, id = '' } = await createServerClient();
  const { data } = await supabase.from('profile').select('avatar_url, name, username, id').eq('id', id).single();

  return (
    <nav className="flex h-16 w-full justify-center border-b">
      {isLoggedIn && data ? (
        <div className="flex w-full max-w-screen-2xl items-center justify-between p-3 text-sm text-foreground">
          <div className="w-full border-b">
            <div className="flex h-16 items-center justify-between space-x-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center gap-4 space-x-4">
                <Search />
                <UserNav data={data}></UserNav>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-screen-2xl items-center justify-end p-3 text-sm text-foreground">
          <Link href="/login" className={buttonVariants({ variant: 'outline', className: 'justify-start' })}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
