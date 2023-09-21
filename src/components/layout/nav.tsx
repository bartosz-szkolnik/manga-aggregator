import { LogoutButton } from '../logout-button';
import { Link } from '../ui/link';
import { createServerClient } from '@/src/utils/supabase';

export async function Nav() {
  const { user } = await createServerClient();

  return (
    <nav className="w-full flex justify-center border-b h-16">
      <div className="w-full flex max-w-screen-2xl justify-between items-center p-3 text-sm text-foreground">
        <div />
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
