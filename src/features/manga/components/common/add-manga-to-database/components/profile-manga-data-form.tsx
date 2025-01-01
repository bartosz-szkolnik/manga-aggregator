'use client';

import { DialogFooter } from '@components/ui/dialog';
import { Form, FormControl, ErrorMessage, SubmitButton, Label, Switch } from '@components/ui/form';
import { ChangePrioritySelect } from '@manga/components/common/change-priority';
import { ChangeReadingStatusSelect } from '@manga/components/common/change-reading-status';
import { ChangeLatestChapterRead } from '@manga/components/common/change-latest-chapter-read';
import { HandlerFn, HandlerFnOptionalParam } from '@utils/types';
import { ListChecks } from 'lucide-react';
import { WithoutAppErrors, ProfileMangaDataState } from '../add-manga-to-database-state';
import { Button } from '@components/ui/button';
import { useState } from 'react';
import { ReadingStatus } from '@manga/types';

type ProfileMangaDataFormProps = {
  submitAction: HandlerFn<FormData>;
  state: WithoutAppErrors<ProfileMangaDataState>;
  closeModal: HandlerFnOptionalParam;
};

export function ProfileMangaDataForm({ submitAction, state, closeModal }: ProfileMangaDataFormProps) {
  const { error, data } = state;
  const [values, setValues] = useState({ latestChapterRead: '0', readingStatus: 'want to read' as ReadingStatus });

  function handleAllCaughtUp() {
    const isMangaFinished = data.mangaStatus === 'completed';

    setValues({
      latestChapterRead: data.mangaLatestChapter.chapter ?? '0',
      readingStatus: isMangaFinished ? 'finished reading' : 'reading',
    });
  }

  const latestChapter = data.mangaLatestChapter.chapter;
  return (
    <Form action={submitAction} errors={error} className="grid gap-4 pt-4">
      <div className="flex items-center justify-between gap-4">
        <FormControl controlName="add-to-user-library" controlType="switch" className="w-full">
          <Label>Add to My Library</Label>
          <Switch defaultChecked disabled />
        </FormControl>
        <FormControl controlName="start-following" controlType="switch" className="w-full">
          <Label>Start Following</Label>
          <Switch />
        </FormControl>
        <FormControl controlName="is-favorite" controlType="switch" className="w-full">
          <Label>Add to My Favorites</Label>
          <Switch />
        </FormControl>
      </div>

      <div className="flex items-end justify-start gap-6">
        <ChangeLatestChapterRead
          latestChapter={latestChapter ?? '0'}
          latestChapterRead={values.latestChapterRead}
          className="min-w-64 max-w-64"
          setValue={value => setValues(values => ({ ...values, latestChapterRead: value }))}
        />
        <Button type="button" onClick={handleAllCaughtUp}>
          <ListChecks className="mr-2 h-5 w-5" />
          {"I'm all caught up!"}
        </Button>
      </div>
      <div className="flex gap-4">
        <FormControl controlName="reading-status">
          <Label>Reading status</Label>
          <ChangeReadingStatusSelect
            readingStatus={values.readingStatus}
            setValue={value => setValues(values => ({ ...values, readingStatus: value }))}
          />
          <ErrorMessage />
        </FormControl>
        <FormControl controlName="priority">
          <Label>Priority</Label>
          <ChangePrioritySelect priority={'normal'} />
          <ErrorMessage />
        </FormControl>
      </div>

      <DialogFooter className="flex gap-2">
        <Button variant={'secondary'} type="button" onClick={closeModal}>
          Cancel
        </Button>
        <SubmitButton>Confirm</SubmitButton>
      </DialogFooter>
    </Form>
  );
}
