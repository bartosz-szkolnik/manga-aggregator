'use client';

import { forwardRef, useState } from 'react';
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
import { addMangaToDatabase } from './add-manga-to-database-action';
import { ErrorMessage, Form, FormControl, Input, Label, SubmitButton, Switch } from '@components/ui/form';
import { cn, exhaustiveCheck } from '@utils/utils';
import { toast } from 'sonner';
import { FormActionResultErrors, HandlerFn } from '@utils/types';
import { CheckEveryFormControl } from '@lib/change-mangas-check-every';
import { BookPlus } from 'lucide-react';

type AddMangaDialogProps = {
  smallButton?: boolean;
  className?: string;
};

export function AddMangaToDatabaseDialog({ smallButton = false, className }: AddMangaDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <TriggerButton smallButton={smallButton} className={className} />
      </DialogTrigger>
      <AddMangaToDatabaseDialogContent setOpen={value => setOpen(value)} />
    </Dialog>
  );
}

export function AddMangaToDatabaseDialogContent({ setOpen }: { setOpen: HandlerFn<boolean> }) {
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
          <Switch defaultChecked />
        </FormControl>
        <FormControl controlName="start-following" controlType="switch">
          <Label>Start following</Label>
          <Switch />
        </FormControl>
        <FormControl controlName="is-favorite" controlType="switch">
          <Label>Add to favorites</Label>
          <Switch />
        </FormControl>
        <CheckEveryFormControl numberOf="7" period="days" />
        <DialogFooter>
          <SubmitButton>Save Manga</SubmitButton>
        </DialogFooter>
      </Form>
    </DialogContent>
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
  className?: string;
};

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ smallButton = false, className, ...props }, ref) =>
    smallButton ? (
      <Button {...props} ref={ref} size="sm" className={cn('relative', className)}>
        Add Manga
      </Button>
    ) : (
      <Button {...props} ref={ref} className={className}>
        <BookPlus className="mr-2 h-5 w-5" />
        Add Manga
      </Button>
    ),
);
TriggerButton.displayName = 'TriggerButton';
