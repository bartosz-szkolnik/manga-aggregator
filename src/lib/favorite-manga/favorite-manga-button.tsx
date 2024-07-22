'use client';

import { Button } from '@components/ui/button';
import { favoriteManga } from './favorite-manga-action';
import { ActionButton } from '@components/ui/action-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function FavoriteMangaButton({
  mangaId,
  className,
  isFavorite,
}: {
  mangaId: string;
  className?: string;
  isFavorite: boolean;
}) {
  const [open, setOpen] = useState(false);

  async function handleFavoriteManga() {
    const { error } = await favoriteManga(mangaId, isFavorite);
    if (error) {
      console.error(error);
    } else {
      console.info(`You have favorited this manga.`);
    }
  }

  async function handleUnFavoriteManga() {
    const { error } = await favoriteManga(mangaId, isFavorite);
    setOpen(false);

    if (error) {
      console.error(error);
    } else {
      console.info(`You have removed this manga from your favorites.`);
    }
  }

  if (!isFavorite) {
    return (
      <ActionButton actionFn={handleFavoriteManga} className={className}>
        <StarIcon className="mr-2 h-4 w-4" />
        Favorite
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <StarFilledIcon className="mr-2 h-4 w-4" />
          Remove from favorites
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this manga from your favorites?</DialogTitle>
          <DialogDescription>
            What about all the memories you&apos;ve made with it? All of the characters? Don&apos;t make the main
            heroine cry.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton actionFn={handleUnFavoriteManga}>Remove from favorites</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
