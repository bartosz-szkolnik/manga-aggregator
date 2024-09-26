'use client';

import { ErrorMessage, Form, FormControl, Input, Label, SubmitButton } from '@components/ui/form';
import { MangaIdState, WithoutAppErrors } from '../add-manga-to-database-state';
import { DialogFooter } from '@components/ui/dialog';
import { HandlerFn, HandlerFnOptionalParam } from '@utils/types';
import { useState } from 'react';
import { Button } from '@components/ui/button';

type MangaIdFormProps = {
  submitAction: HandlerFn<FormData>;
  state: WithoutAppErrors<MangaIdState>;
  closeModal: HandlerFnOptionalParam;
};

export function MangaIdForm({ submitAction, state, closeModal }: MangaIdFormProps) {
  const { error } = state;
  const [value, setValue] = useState('');

  return (
    <Form action={submitAction} errors={error} className="grid gap-4 pt-4">
      <FormControl controlName="url">
        <Label>Manga URL</Label>
        <Input
          onChange={e => setValue(e.currentTarget.value)}
          value={value}
          placeholder="https://mangadex.org/title/{id}/{title}"
          autoComplete="off"
        />
        <ErrorMessage />
      </FormControl>
      <DialogFooter className="flex gap-2">
        <Button variant={'secondary'} type="button" onClick={closeModal}>
          Cancel
        </Button>
        <SubmitButton disabled={!value}>Continue...</SubmitButton>
      </DialogFooter>
    </Form>
  );
}
