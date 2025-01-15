'use client';

import { Button } from '@components/ui/button';
import { DialogFooter } from '@components/ui/dialog';
import { Form, SubmitButton } from '@components/ui/form';
import { CheckEveryFormControl } from '@manga/components/common/change-mangas-check-every';
import { HandlerFn, HandlerFnOptionalParam } from '@utils/types';
import { WithoutAppErrors, MangaDataState } from '../add-manga-to-database-state';
import { getMangaDescription, getMangaTitle } from '@manga/utils';
import { MangaPortrait } from '@manga/components/artwork';

type MangaDataFormProps = {
  submitAction: HandlerFn<FormData>;
  state: WithoutAppErrors<MangaDataState>;
  closeModal: HandlerFnOptionalParam;
};

export function MangaDataForm({ submitAction, state, closeModal }: MangaDataFormProps) {
  const { error, type, data } = state;
  const { title, description } = data.mangaAttributes;

  function handleBack() {
    const data = new FormData();
    data.append('back', 'true');
    submitAction(data);
  }

  function handleSaveAndClose(formData: FormData) {
    formData.append('close', 'true');
    submitAction(formData);
  }

  return (
    <Form action={submitAction} errors={error} className="grid gap-4 pt-4">
      <div className="mb-4 mt-6 grid grid-cols-2">
        <div className="max-w-[22rem]">
          <MangaPortrait
            imageUrl={`https://mangadex.org/covers/${data.mangaId}/${data.mangaCover}`}
            title={getMangaTitle(title)}
            size="lg"
            aspectRatio={'portrait'}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-between px-6 py-4">
          <div className="flex max-h-80 flex-col gap-4">
            <h3 className="text-center text-xl font-semibold text-foreground">{getMangaTitle(title)}</h3>
            <p className="flex-1 overflow-auto text-justify text-sm text-foreground">
              {getMangaDescription(description)}
            </p>
          </div>
          <CheckEveryFormControl numberOf="7" period="days" disabled={type !== 'MANGA_DATA'} />
        </div>
      </div>
      <DialogFooter className="flex gap-2">
        <Button variant={'secondary'} type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant={'secondary'} type="button" onClick={handleBack}>
          Back
        </Button>
        <Button formAction={handleSaveAndClose}>Save and Close</Button>
        <SubmitButton>Save and Follow</SubmitButton>
      </DialogFooter>
    </Form>
  );
}
