import { Link } from '../ui/link';
import { createServerClient } from '@/src/utils/supabase';
import { Search } from './search';
import { UserNav } from './user-nav';
import { MainNav } from './main-nav';
import { buttonVariants } from '../ui/button';

export async function Nav() {
  const { isLoggedIn, supabase, id = '' } = await createServerClient();
  const { data } = await supabase.from('profile').select('avatar_url, name, username, id').eq('id', id).single();

  return (
    <nav className="w-full flex justify-center border-b h-16">
      {isLoggedIn && data ? (
        <div className="w-full flex max-w-screen-2xl justify-between items-center p-3 text-sm text-foreground">
          <div className="border-b w-full">
            <div className="flex h-16 items-center justify-between space-x-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4 gap-4">
                <Search />
                <UserNav data={data}></UserNav>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex max-w-screen-2xl justify-end items-center p-3 text-sm text-foreground">
          <Link href="/login" className={buttonVariants({ variant: 'outline', className: 'justify-start' })}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
