'use client';

import { Button } from '@components/ui/button';
import { favoriteManga } from './favorite-manga-action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useState, useActionState } from 'react';
import { ActionButton } from '@components/ui/form';
import { toast } from 'sonner';
import { ActionResultErrors } from '@utils/types';
import { exhaustiveCheck } from '@utils/utils';
import { getRandomCommonClosingMessage } from '@lib/dialog-closing-messages';

type FavoriteMangaButtonProps = {
  mangaId: string;
  className?: string;
  isFavorite: boolean;
  setCookie?: boolean;
};

export function FavoriteMangaButton({ mangaId, className, isFavorite, setCookie = false }: FavoriteMangaButtonProps) {
  const [open, setOpen] = useState(false);

  const [, submitFavoriteAction] = useActionState(async () => {
    const { error } = await favoriteManga(mangaId, isFavorite, setCookie);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`You have marked this manga as favorite.`);
  }, null);

  const [, submitUnfavoriteAction] = useActionState(async () => {
    const { error } = await favoriteManga(mangaId, isFavorite, setCookie);
    if (error) {
      return handleErrors(error);
    }

    setOpen(false);
    toast.success(`You have removed this manga from your favorites.`);
  }, null);

  if (!isFavorite) {
    return (
      <ActionButton submitAction={submitFavoriteAction} className={className}>
        <HeartIcon className="mr-2 h-4 w-4" />
        Favorite
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <HeartFilledIcon className="mr-2 h-4 w-4" />
          Remove from favorites
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this manga from your favorites?</DialogTitle>
          <DialogDescription>{getRandomCommonClosingMessage()}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton submitAction={submitUnfavoriteAction}>Remove from favorites</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: ActionResultErrors<typeof favoriteManga>) {
  if (error === 'NOT_SIGNED_IN_ERROR') {
    return toast.error('You need to be signed in to perform this action.');
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    return toast.error('Something went wrong. Please try again.');
  }

  exhaustiveCheck(error);
}
