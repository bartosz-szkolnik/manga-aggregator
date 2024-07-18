import { Link } from '@components/ui/link';
import { Separator } from '@components/ui/separator';
import { createServerClient } from '@utils/supabase/server';

export default async function PrivatePage() {
  const { supabase } = await createServerClient();

  // prettier-ignore
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return (
      <>
        <p>You need to sign in to view this page</p>
        <Link href="/auth/sign-in">Sign in</Link>
      </>
    );
  }

  const { data } = await supabase.from('manga').select('title, id');

  return (
    <main className="px-4 py-6 lg:px-8">
      <h2 className="text-2xl font-semibold tracking-tight">Hello {user.email}</h2>
      <Separator dir="horizontal" className="my-4 bg-slate-400" />
      {data?.map(manga => (
        <>
          <p key={manga.id}>{manga.title}</p>
        </>
      ))}
    </main>
  );
}
