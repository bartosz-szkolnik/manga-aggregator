'use client';

import { useActionState } from 'react';
import { toast } from 'sonner';
import { signUp } from './action';
import { FormActionResultErrors } from '@utils/types';
import { AuthForm } from '@components/auth';

export function SignUpForm() {
  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error, success } = await signUp(formData);

    if (success) {
      toast.success('You have been signed up... ');
    } else {
      return handleErrors(error);
    }
  }, null);

  return <AuthForm action={submitAction} errors={errors} />;
}

function handleErrors(error: FormActionResultErrors<typeof signUp>) {
  if (Array.isArray(error)) {
    return error;
  }

  if (error === 'USER_ALREADY_REGISTERED') {
    toast.error('User with given email is already registered. Please try a different email.');
    return;
  }

  if (error === 'SOMETHING_WENT_WRONG') {
    toast.error('Something went wrong. Please try again.');
    return;
  }
}
