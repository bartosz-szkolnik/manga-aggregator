'use client';

import { AuthForm } from '@components/auth';
import { useActionState } from 'react';
import { signIn } from './action';
import { toast } from 'sonner';
import { FormActionResultErrors } from '@utils/types';

export function SignInForm() {
  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error, success } = await signIn(formData);

    if (success) {
      toast.success('You are now signed in... ');
    } else {
      return handleErrors(error);
    }
  }, null);

  return <AuthForm action={submitAction} errors={errors} />;
}

function handleErrors(error: FormActionResultErrors<typeof signIn>) {
  if (Array.isArray(error)) {
    return error;
  }

  if (error === 'INVALID_SIGN_IN_CREDENTIALS') {
    toast.error('Invalid email or password. Please try again.');
    return;
  }

  if (error === 'SOMETHING_WENT_WRONG') {
    toast.error('Something went wrong. Please try again.');
    return;
  }
}
