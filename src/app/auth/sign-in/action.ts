'use server';

import { createServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signIn(data: { email: string; password: string }) {
  const { supabase } = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      error: error.message ?? 'Invalid email or password. Please try again.',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
