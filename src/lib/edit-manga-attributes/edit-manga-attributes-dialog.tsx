'use client';

import { Button } from '@components/ui/button';
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
import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Form, FormControl, Input, ErrorMessage, SubmitButton, Label } from '@components/ui/form';
import { Manga } from '@lib/types/manga.types';
import { ChangeMangaStatusSelect } from '@lib/change-manga-status';
import { CheckEveryFormControl } from '@lib/change-mangas-check-every';
import { editMangaAttributesAction } from './edit-manga-attributes-action';
import { toast } from 'sonner';
import { FormActionResultErrors } from '@utils/types';
import { exhaustiveCheck } from '@utils/utils';

export function EditMangaAttributesDialog({ className, data }: { className?: string; data: Manga }) {
  const [open, setOpen] = useState(false);

  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error, success } = await editMangaAttributesAction(formData, data.id);

    if (success) {
      setOpen(false);
      toast.success('Edited attributes of this manga.');
    } else {
      return handleErrors(error);
    }
  }, null);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Manga
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manga to our Database</DialogTitle>
          <DialogDescription>Copy the url from MangaDex and paste it here to save Manga.</DialogDescription>
        </DialogHeader>
        <Form action={submitAction} errors={errors} className="grid gap-4 py-4">
          <FormControl controlName="title">
            <Label>Manga Title</Label>
            <Input placeholder="Manga Title" defaultValue={data.title} />
            <ErrorMessage />
          </FormControl>
          <FormControl controlName="image-url">
            <Label>Image URL</Label>
            <Input placeholder="Image URL" defaultValue={data.image_url} />
            <ErrorMessage />
          </FormControl>
          <FormControl controlName="manga-status">
            <Label>Status of the Manga</Label>
            <ChangeMangaStatusSelect mangaStatus={data.manga_status ?? 'ongoing'} />
            <ErrorMessage />
          </FormControl>
          <FormControl controlName="latest-chapter">
            <Label>Latest Chapter</Label>
            <Input placeholder="Latest Chapter" defaultValue={data.latest_chapter ?? ''} />
            <ErrorMessage />
          </FormControl>
          <CheckEveryFormControl numberOf={data.check_every_number ?? '7'} period={data.check_every_period ?? 'days'} />
          <DialogFooter>
            <SubmitButton>Save changes</SubmitButton>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: FormActionResultErrors<typeof editMangaAttributesAction>) {
  if (Array.isArray(error)) {
    return error;
  }

  if (error === 'NOT_SINGED_IN_AS_ADMIN_ERROR') {
    toast.error('You need to be signed in as admin to perform this action.');
    return;
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    toast.error('Something went wrong. Please try again.');
    return;
  }

  exhaustiveCheck(error);
}
