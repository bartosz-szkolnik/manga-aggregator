import { createServerClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const { supabase } = await createServerClient();

  // prettier-ignore
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/sign-in');
  }

  const { data } = await supabase.from('manga').select('title, id');

  return (
    <>
      <h1>Hello {user.email}</h1>
      {data?.map(manga => (
        <>
          <p key={manga.id}>{manga.title}</p>
        </>
      ))}
    </>
  );
}
