import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../lib/database.types';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const id = user!.id!;

  return { supabase, user, id };
}
