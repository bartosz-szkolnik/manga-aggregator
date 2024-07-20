import { ActionButton } from '@components/ui/action-button';
import { useTransition } from 'react';
import { allCaughtUp } from './all-caught-up-action';
import { Manga } from '@lib/types/manga.types';

type AllCaughtUpButtonProps = { mangaId: Manga['id']; handleSuccess: () => void };

export function AllCaughtUpButton({ mangaId, handleSuccess }: AllCaughtUpButtonProps) {
  const [, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      const { error } = await allCaughtUp(mangaId);
      if (error) {
        console.error(error);
      } else {
        handleSuccess();
        console.info('Your progress has been updated!');
      }
    });
  }

  return <ActionButton actionFn={handleClick}>I&apos;m all caught up!</ActionButton>;
}
