import { createBrowserClient } from 'npm:@supabase/ssr';
import { Database } from './database.types.ts';
import { PostgrestError } from '@supabase/supabase-js';

// Automatically load environment variables from a `.env` file
// import "@std/dotenv/load";

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient<Database>>;

export function createSupabaseBrowserClient(req: Request) {
  return createBrowserClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
    },
  );
}

export function serveHandler(callback: (client: SupabaseBrowserClient, req: Request) => Response | Promise<Response>) {
  return (req: Request) => {
    try {
      const client = createSupabaseBrowserClient(req);
      return callback(client, req);
    } catch (error) {
      return sendServerError(error);
    }
  };
}

export function sendSuccessResponse(message: string) {
  return new Response(JSON.stringify({ message, success: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

export function isTruthy<T>(value: T): value is NonNullable<T> {
  return Boolean(value);
}

function sendServerError(error: PostgrestError) {
  console.error(error);
  return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 500,
  });
}
