'use server';

import { authFormSchema } from '@auth/auth-form';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { FormActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const { error: parseError, data } = authFormSchema.safeParse(Object.fromEntries(formData));
  if (parseError) {
    return { success: false, error: parseError.issues } satisfies Awaited<FormActionResult>;
  }

  const { supabase } = await createServerClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo: 'https://manga-aggregator.vercel.app' },
  });
  if (error) {
    if (error.message === 'User already registered') {
      return { success: false, error: 'USER_ALREADY_REGISTERED' } satisfies Awaited<FormActionResult>;
    } else {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
    }
  }

  revalidatePath('/', 'layout');
  redirect('/auth/sign-up/confirm');
}
