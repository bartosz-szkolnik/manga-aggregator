'use client';

import { Description, ErrorMessage, Form, FormControl, Input, Label, SubmitButton } from '@components/ui/form';
import { useFormState as useActionState } from 'react-dom';
import { toast } from 'sonner';
import { updateProfile } from './profile-action';
import { FormActionResultErrors } from '@utils/types';
import { exhaustiveCheck } from '@utils/utils';

type ProfileSettingsFormProps = {
  name: string;
  profileUrl: string;
};

export function ProfileSettingsForm({ name, profileUrl }: ProfileSettingsFormProps) {
  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error, success } = await updateProfile(formData);

    if (success) {
      toast.success('We have updated your profile information.');
    } else {
      return handleErrors(error);
    }
  }, null);

  return (
    <Form action={submitAction} errors={errors} className="grid gap-4 py-4">
      <FormControl controlName="name">
        <Label>Name</Label>
        <Description>Your name, don&apos;t have to be the real thing</Description>
        <Input placeholder="Your name" defaultValue={name} />
        <ErrorMessage />
      </FormControl>

      <FormControl controlName="profile-url">
        <Label>Profile picture URL</Label>
        <Description>
          Please provide a url to an image that you want to be displayed. No image upload yet, sorry.
        </Description>
        <Input placeholder="Your profile picture url" defaultValue={profileUrl} />
        <ErrorMessage />
      </FormControl>

      <div className="mt-8 flex flex-row-reverse">
        <SubmitButton className="max-w-44">Update profile</SubmitButton>
      </div>
    </Form>
  );
}

function handleErrors(error: FormActionResultErrors<typeof updateProfile>) {
  if (Array.isArray(error)) {
    return error;
  }

  if (error === 'NOT_SIGNED_IN_ERROR') {
    toast.error('You need to be signed in to perform this action.');
    return;
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    toast.error('Something went wrong. Please try again.');
    return;
  }

  exhaustiveCheck(error);
}
