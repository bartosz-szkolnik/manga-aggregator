'use client';

import { Button } from '@components/ui/button';
import { SubmitButton } from '@components/ui/form';
import { useTransition } from 'react';
import { allCaughtUp } from './all-caught-up-action';
import { Manga } from '@lib/types/manga.types';
import { ActionResultErrors, HandlerFn } from '@utils/types';
import { toast } from 'sonner';
import { exhaustiveCheck } from '@utils/utils';

export function AllCaughtUpButton({
  mangaId,
  isCaughtUp,
  onSuccess,
}: {
  mangaId: Manga['id'];
  isCaughtUp: boolean;
  onSuccess: HandlerFn;
}) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const { error } = await allCaughtUp(mangaId);
      if (error) {
        handleErrors(error);
      } else {
        onSuccess();
        toast.success('Your progress has been updated!');
      }
    });
  }

  if (isCaughtUp) {
    return <Button disabled>You&apos;re all caught up</Button>;
  }

  return (
    <SubmitButton pending={pending} onClick={handleClick}>
      I&apos;m all caught up!
    </SubmitButton>
  );
}

function handleErrors(error: ActionResultErrors<typeof allCaughtUp>) {
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
