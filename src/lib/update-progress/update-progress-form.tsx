'use client';

import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { ErrorMessage, Form, FormControl, Input, Label, SubmitButton } from '@components/ui/form';
import { ChangePrioritySelect } from '@lib/change-priority';
import { ChangeReadingStatusSelect } from '@lib/change-reading-status';
import { ReadingStatus, Priority } from '@lib/types/manga.types';
import { useState } from 'react';
import { updateProgress } from './update-progress-action';
import { AllCaughtUpButton } from './all-caught-up-button';
import { useFormState as useActionState } from 'react-dom';
import { FormActionResultErrors } from '@utils/types';
import { toast } from 'sonner';
import { exhaustiveCheck } from '@utils/utils';

export type UpdateProgressFormProps = {
  readingStatus: ReadingStatus;
  latestChapterRead: string;
  latestChapter: string;
  priority: Priority;
  mangaId: string;
};

export function UpdateProgressForm({
  readingStatus,
  latestChapterRead,
  latestChapter,
  priority,
  mangaId,
}: UpdateProgressFormProps) {
  const [open, setOpen] = useState(false);

  const [errors = null, submitAction] = useActionState(async (_: unknown, formData: FormData) => {
    const { error } = await updateProgress(formData, mangaId);
    if (error) {
      return handleErrors(error);
    }

    setOpen(false);
    toast.success('Your progress has been updated!');
  }, null);

  if (!open) {
    return (
      <Button variant={'outline'} onClick={() => setOpen(true)}>
        Update your progress...
      </Button>
    );
  }

  const isCaughtUp = latestChapter <= latestChapterRead;
  return (
    <div className="flex items-center justify-center [&>div]:w-full">
      <Card>
        <Form action={submitAction} errors={errors} className="grid gap-4 py-4">
          <CardHeader>
            <CardTitle>Update your progress</CardTitle>
            <CardDescription>
              You can change the latest chapter you have read for each manga. This will be used to calculate how many
              chapters behind you are.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 py-4">
              <AllCaughtUpButton isCaughtUp={isCaughtUp} mangaId={mangaId} onSuccess={() => setOpen(false)} />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <FormControl controlName="latest-chapter-read">
                <Label>Chapters read</Label>
                <div className="flex items-center gap-4">
                  <Input className="max-w-16" defaultValue={latestChapterRead} />
                  <span className="flex-1"> read out of </span>
                  <Input
                    setFormAttributes={false}
                    className="max-w-16"
                    disabled
                    defaultValue={latestChapter}
                    name="disabled-latest-chapter"
                  />
                </div>
                <ErrorMessage />
              </FormControl>
              <FormControl controlName="reading-status">
                <Label>Reading status</Label>
                <ChangeReadingStatusSelect readingStatus={readingStatus ?? 'want to read'} />
                <ErrorMessage />
              </FormControl>
              <FormControl controlName="priority">
                <Label>Priority</Label>
                <ChangePrioritySelect priority={priority} />
                <ErrorMessage />
              </FormControl>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <SubmitButton>Save</SubmitButton>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}

function handleErrors(error: FormActionResultErrors<typeof updateProgress>) {
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
