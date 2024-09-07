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
import { useState } from 'react';
import { toast } from 'sonner';
import { ActionResultErrors } from '@utils/types';
import { exhaustiveCheck } from '@utils/utils';
import { ActionButton } from '@components/ui/form';
import { removeMangaFromDatabase } from './remove-manga-from-database-action';

export function RemoveMangaFromDatabaseButton({ mangaId, className }: { mangaId: string; className?: string }) {
  const [open, setOpen] = useState(false);

  const [, submitRemoveAction] = useActionState(async () => {
    const { error } = await removeMangaFromDatabase(mangaId);
    setOpen(false);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`This manga has been removed from the database.`);
  }, null);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>Remove from database</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this manga from the database?</DialogTitle>
          <DialogDescription>I don&apos;t know what to tell you man...</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton submitAction={submitRemoveAction}>Remove from database</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: ActionResultErrors<typeof removeMangaFromDatabase>) {
  if (error === 'NOT_SINGED_IN_AS_ADMIN_ERROR') {
    return toast.error('You need to be signed in as admin to perform this action.');
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    return toast.error('Something went wrong. Please try again.');
  }

  exhaustiveCheck(error);
}
