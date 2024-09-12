'use server';

import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { FormActionResult } from '@utils/types';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(50, { message: 'Username must not be longer than 50 characters.' }),
  'profile-url': z.string().url({ message: 'Please enter a valid URL.' }),
});

export async function updateProfile(formData: FormData) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return { success: false, error: 'NOT_SIGNED_IN_ERROR' } satisfies Awaited<FormActionResult>;
  }

  const { data, error } = schema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { success: false, error: error.issues } satisfies Awaited<FormActionResult>;
  }

  {
    const { error } = await supabase
      .from('profile')
      .update({ name: data.name, avatar_url: data['profile-url'] })
      .eq('id', userId);

    if (error) {
      logger.error(error);
      return { success: false, error: 'SOMETHING_WENT_WRONG' } satisfies Awaited<FormActionResult>;
    }
  }

  return { success: true } satisfies Awaited<FormActionResult>;
}
