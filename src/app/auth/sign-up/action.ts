'use server';

import { createServerClient } from '@utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(data: { email: string; password: string }) {
  const { supabase } = await createServerClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
