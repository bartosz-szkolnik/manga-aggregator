import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import { Database } from '@manga/types';

export function createBrowserClient() {
  return createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export type SupabaseBrowserClient = ReturnType<typeof createSupabaseBrowserClient<Database>>;
