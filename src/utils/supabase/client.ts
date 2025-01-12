import { Database } from '@lib/types';
import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

export function createBrowserClient() {
  const client = createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return { supabase: client };
}

export type SupabaseBrowserClient = ReturnType<typeof createSupabaseBrowserClient<Database>>;
