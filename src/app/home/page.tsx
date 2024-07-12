import { createServerClient } from '@utils/supabase/server';
import ClientComponent from './test-client-component';
import { SignOutButton } from '@components/sign-out-button';

export default async function HomePage() {
  const { isLoggedIn } = await createServerClient();

  return (
    <main>
      <h1>Home page</h1>
      is logged in? {isLoggedIn ? 'Yes' : 'No'}
      <hr />
      <ClientComponent />
      <SignOutButton />
    </main>
  );
}
