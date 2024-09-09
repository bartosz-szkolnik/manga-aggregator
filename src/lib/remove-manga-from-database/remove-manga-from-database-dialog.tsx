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
import { Trash2 } from 'lucide-react';

type RemoveMangaFromDatabaseButtonProps = {
  mangaId: string;
  className?: string;
  smallButton?: boolean;
};

export function RemoveMangaFromDatabaseButton({
  mangaId,
  className,
  smallButton = false,
}: RemoveMangaFromDatabaseButtonProps) {
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
        <Button className={className} size={smallButton ? 'xs' : 'default'}>
          <Trash2 className="mr-2 h-4 w-4" />
          Remove from database
        </Button>
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
