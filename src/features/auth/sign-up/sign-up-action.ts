'use server';

import { authFormSchema } from '@auth/auth-form';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { FormActionResult } from '@utils/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const { error, data } = authFormSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { success: false, error: error.issues } satisfies Awaited<FormActionResult>;
  }

  const { supabase } = await createServerClient();
  {
    const { error } = await supabase.auth.signUp(data);
    if (error) {
      if (error.message === 'User already registered') {
        return { success: false, error: 'USER_ALREADY_REGISTERED' } satisfies Awaited<FormActionResult>;
      } else {
        logger.error(error);
        return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
      }
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
