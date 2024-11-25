import { cookies } from 'next/headers';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { Database } from '@type/database.types';

export async function createServerClient() {
  const cookieStore = await cookies();

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
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  );

  // prettier-ignore
  const { data: { user } } = await client.auth.getUser();
  const userId = user?.id;
  const { data: profile } = await client.from('profile').select('*').eq('id', userId!).maybeSingle();

  return { supabase: client, user, userId, isLoggedIn: Boolean(user), profile };
}

export type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServerClient<Database>>>;
