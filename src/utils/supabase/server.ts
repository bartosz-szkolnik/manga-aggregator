import { cookies } from 'next/headers';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { Database } from 'src/lib/types/database.types';

export async function createServerClient() {
  const cookieStore = cookies();

  const client = createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: cookieToSet => {
          try {
            cookieToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch (error) {
            // add redirect to login page, I think the settings of the cookies break the app after the token has expired
            console.error(error);
          }
        },
      },
    },
  );

  // prettier-ignore
  const { data: { user } } = await client.auth.getUser();
  const userId = user?.id;

  return { supabase: client, user, userId, isLoggedIn: Boolean(user) };
}
