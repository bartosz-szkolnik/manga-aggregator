'use client';

import { useActionState } from 'react';
import { HandlerFnOptionalParam } from '@utils/types';
import { addMangaToDatabase } from './add-manga-to-database-action';
import { toast } from 'sonner';
import { AddMangaToDatabaseState, matchState, WithoutAppErrors } from './add-manga-to-database-state';
import { MangaDataForm, MangaIdForm, ProfileMangaDataForm } from './components';
import { useSearchParams } from 'next/navigation';

type AddMangaToDatabaseDialogFormProps = {
  closeModal: HandlerFnOptionalParam;
};

export function AddMangaToDatabaseDialogForm({ closeModal }: AddMangaToDatabaseDialogFormProps) {
  const searchParams = new URLSearchParams(useSearchParams());
  const isInGrid = searchParams.get('tab') === 'grid';

  const [state, submitAction] = useActionState(
    async (previousState: AddMangaToDatabaseState, formData: FormData) => {
      const state = await addMangaToDatabase(previousState, formData, isInGrid);

      if ((state.type === 'PROFILE_MANGA_DATA' && state.error === null) || state.type === 'MANGA_DATA_CLOSE_MODAL') {
        toast.success('We have added this manga to our database.');
        if (state.type === 'MANGA_DATA_CLOSE_MODAL') {
          closeModal();
        }
      } else if (state.type === 'PROFILE_MANGA_DATA_SUCCESS' && state.error === null) {
        toast.success('We have saved your manga progress.');
        closeModal();
      }

      const error = handleErrors(state) ?? null;
      return { ...state, error } as WithoutAppErrors<AddMangaToDatabaseState>;
    },
    { type: 'MANGA_ID', error: null },
  );

  return (
    <div className="space-y-6">
      {matchState(state, 'MANGA_ID') && (
        <MangaIdForm state={state} submitAction={submitAction} closeModal={closeModal} />
      )}
      {matchState(state, 'MANGA_DATA') && (
        <MangaDataForm state={state} submitAction={submitAction} closeModal={closeModal} />
      )}
      {matchState(state, 'PROFILE_MANGA_DATA') && (
        <ProfileMangaDataForm state={state} submitAction={submitAction} closeModal={closeModal} />
      )}
    </div>
  );
}

function handleErrors(state: Awaited<ReturnType<typeof addMangaToDatabase>>) {
  if (state.type !== 'PROFILE_MANGA_DATA_SUCCESS') {
    const { error } = state;
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
  }
}
