'use client';

import { FormEvent, forwardRef, MouseEventHandler, useState, useTransition } from 'react';
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
import { addManga as addMangaAction } from './add-manga-action';
import { ErrorMessage, Form, FormControl, Input, Label, Switch } from '@components/ui/form';
import { addMangaSchema } from './add-manga-schema';
import { ZodIssue } from 'zod';

type AddMangaDialogProps = {
  smallButton?: boolean;
};

export function AddMangaDialog({ smallButton = false }: AddMangaDialogProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  // const { toast } = useToast();

  async function addManga(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const { success, data, error } = addMangaSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      setErrors(error.issues);
      return;
    }

    startTransition(async () => {
      const { error, success } = await addMangaAction(data);
      if (error) {
        handleAddMangaError(error);
      } else {
        console.log(`We have added this manga to our database. The id is ${success}`);
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <TriggerButton smallButton={smallButton} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manga to our Database</DialogTitle>
          <DialogDescription>Copy the url from MangaDex and paste it here to save Manga.</DialogDescription>
        </DialogHeader>
        <Form onSubmit={addManga} errors={errors} id="add-manga-form" className="grid gap-4 py-4">
          <FormControl controlName="url">
            <Label>Manga URL</Label>
            <Input placeholder="https://mangadex.org/title/{id}/{title}"></Input>
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
        </Form>
        <DialogFooter>
          <Button form="add-manga-form">Save Manga</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const TriggerButton = forwardRef<HTMLButtonElement, { smallButton: boolean; onClick?: MouseEventHandler }>(
  ({ smallButton = false, onClick }, ref) =>
    smallButton ? (
      <Button ref={ref} size="sm" className="relative" onClick={onClick}>
        Add Manga
      </Button>
    ) : (
      <Button onClick={onClick} ref={ref}>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Add Manga
      </Button>
    ),
);
TriggerButton.displayName = 'TriggerButton';

async function handleAddMangaError(error: 'Manga is already in Database' | 'Something went wrong') {
  console.error(error);
}

// toast({
//   title: 'Already in our database!',
//   description: 'We already have this manga in our database.',
//   variant: 'destructive',
// });
// toast({
//   title: 'Success!',
//   description: 'We have added this manga to our database.',
// });
// }
