'use client';

import { forwardRef, MouseEventHandler, useState } from 'react';
import { useFormState as useActionState } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { addMangaToDatabase } from './add-manga-to-database-action';
import { ErrorMessage, Form, FormControl, Input, Label, SubmitButton, Switch } from '@components/ui/form';
import { cn, exhaustiveCheck } from '@utils/utils';
import { toast } from 'sonner';
import { FormActionResultErrors } from '@utils/types';

type AddMangaDialogProps = {
  smallButton?: boolean;
  className?: string;
};

export function AddMangaToDatabaseDialog({ smallButton = false, className }: AddMangaDialogProps) {
  const [open, setOpen] = useState(false);

  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error, success } = await addMangaToDatabase(formData);

    if (success) {
      setOpen(false);
      toast.success('We have added this manga to our database.');
    } else {
      return handleErrors(error);
    }
  }, null);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <TriggerButton smallButton={smallButton} className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manga to our Database</DialogTitle>
          <DialogDescription>Copy the url from MangaDex and paste it here to save Manga.</DialogDescription>
        </DialogHeader>
        <Form action={submitAction} errors={errors} className="grid gap-4 py-4">
          <FormControl controlName="url">
            <Label>Manga URL</Label>
            <Input placeholder="https://mangadex.org/title/{id}/{title}" />
            <ErrorMessage />
          </FormControl>
          <FormControl controlName="add-to-user-library" controlType="switch">
            <Label>Add to my library</Label>
            <Switch />
          </FormControl>
          <FormControl controlName="start-following" controlType="switch">
            <Label>Start following</Label>
            <Switch />
          </FormControl>
          <FormControl controlName="is-favorite" controlType="switch">
            <Label>Add to favorites</Label>
            <Switch />
          </FormControl>
          <DialogFooter>
            <SubmitButton>Save Manga</SubmitButton>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: FormActionResultErrors<typeof addMangaToDatabase>) {
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
  if (error === 'MANGA_ALREADY_IN_DATABASE') {
    toast.warning('We already have this manga in our database.');
    return;
  }

  exhaustiveCheck(error);
}

type TriggerButtonProps = {
  smallButton: boolean;
  onClick?: MouseEventHandler;
  className?: string;
};

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ smallButton = false, onClick, className }, ref) =>
    smallButton ? (
      <Button ref={ref} size="sm" className={cn('relative', className)} onClick={onClick}>
        Add Manga
      </Button>
    ) : (
      <Button onClick={onClick} ref={ref} className={className}>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Add Manga
      </Button>
    ),
);
TriggerButton.displayName = 'TriggerButton';
