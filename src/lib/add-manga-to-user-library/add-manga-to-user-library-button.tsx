'use client';

import { useFormState as useActionState } from 'react-dom';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { addToUserLibrary } from './add-manga-to-user-library-action';
import { toast } from 'sonner';
import { ActionResultErrors } from '@utils/types';
import { exhaustiveCheck } from '@utils/utils';
import { ActionButton } from '@components/ui/form';

export function AddMangaToUserLibraryButton({
  mangaId,
  className,
  isInLibrary,
}: {
  mangaId: string;
  className?: string;
  isInLibrary: boolean;
}) {
  const [open, setOpen] = useState(false);

  const [, submitAddAction] = useActionState(async () => {
    const { error } = await addToUserLibrary(mangaId, isInLibrary);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`You have added this manga to your library.`);
  }, null);

  const [, submitRemoveAction] = useActionState(async () => {
    const { error } = await addToUserLibrary(mangaId, isInLibrary);
    setOpen(false);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`You have removed this manga from your library.`);
  }, null);

  if (!isInLibrary) {
    return (
      <ActionButton submitAction={submitAddAction} className={className}>
        <StarIcon className="mr-2 h-4 w-4" />
        Add to Library
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <StarFilledIcon className="mr-2 h-4 w-4" />
          Remove from library
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this manga from your library?</DialogTitle>
          <DialogDescription>But remember to drink water ok?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton submitAction={submitRemoveAction}>Remove from library</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: ActionResultErrors<typeof addToUserLibrary>) {
  if (error === 'NOT_SIGNED_IN_ERROR') {
    return toast.error('You need to be signed in to perform this action.');
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    return toast.error('Something went wrong. Please try again.');
  }

  exhaustiveCheck(error);
}
