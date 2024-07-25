'use client';

import { ActionButton } from '@components/ui/action-button';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { ErrorMessage, Form, FormControl, Input, Label } from '@components/ui/form';
import { ChangePrioritySelect } from '@lib/change-priority/change-priority-select';
import { ChangeReadingStatusSelect } from '@lib/change-reading-status/change-reading-status-select';
import { ReadingStatus, Priority } from '@lib/types/manga.types';
import { FormEvent, useState, useTransition } from 'react';
import { ZodIssue } from 'zod';
import { updateProgressSchema } from './update-progress-schema';
import { updateProgress } from './update-progress-action';
import { AllCaughtUpButton } from './all-caught-up-button';

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
  const [, startTransition] = useTransition();
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const [open, setOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const { success, data, error } = updateProgressSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      setErrors(error.issues);
      return;
    }

    startTransition(async () => {
      const { error } = await updateProgress(data, mangaId);
      if (error) {
        console.error(error);
      } else {
        console.info('Your progress has been updated!');
        setOpen(false);
      }
    });
  }

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
        <CardHeader>
          <CardTitle>Update your progress</CardTitle>
          <CardDescription>
            You can change the latest chapter you have read for each manga. This will be used to calculate how many
            chapters behind you are.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <AllCaughtUpButton mangaId={mangaId} handleSuccess={() => setOpen(false)} isCaughtUp={isCaughtUp} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Form onSubmit={handleSubmit} errors={errors} id="update-progress-form" className="grid gap-4 py-4">
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
          </Form>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <ActionButton form="update-progress-form">Save</ActionButton>
        </CardFooter>
      </Card>
    </div>
  );
}
