'use client';

import { DialogFooter } from '@components/ui/dialog';
import { Form, SubmitButton } from '@components/ui/form';
import { CheckEveryFormControl } from '@lib/change-mangas-check-every';
import { MangaImage } from '@lib/manga/manga-image';
import { HandlerFn, HandlerFnOptionalParam } from '@utils/types';
import { WithoutAppErrors, MangaDataState } from '../add-manga-to-database-state';
import { Button } from '@components/ui/button';

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
          <MangaImage
            imageUrl={`https://mangadex.org/covers/${data.mangaId}/${data.mangaCover}`}
            title={title.en ?? title.jp}
            width={50}
            height={130}
            aspectRatio={'portrait'}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-between px-6 py-4">
          <div className="flex max-h-80 flex-col gap-4">
            <h3 className="text-center text-xl font-semibold text-foreground">{title.en ?? title.jp}</h3>
            <p className="flex-1 overflow-auto text-justify text-sm text-foreground">
              {description.en ?? description.ja}
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
