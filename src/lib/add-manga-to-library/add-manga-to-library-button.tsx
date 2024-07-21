'use client';

import { Button } from '@components/ui/button';
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
import { addToLibrary } from './add-manga-to-library-action';

export function AddMangaToLibraryButton({
  mangaId,
  className,
  isInLibrary,
}: {
  mangaId: string;
  className?: string;
  isInLibrary: boolean;
}) {
  const [open, setOpen] = useState(false);

  async function handleAddToLibrary() {
    const { error } = await addToLibrary(mangaId, isInLibrary);
    if (error) {
      console.error(error);
    } else {
      console.info(`You have followed this manga.`);
    }
  }

  async function handleRemoveFromLibrary() {
    const { error } = await addToLibrary(mangaId, isInLibrary);
    setOpen(false);

    if (error) {
      console.error(error);
    } else {
      console.info(`You have unfollowed this manga.`);
    }
  }

  if (!isInLibrary) {
    return (
      <ActionButton actionFn={handleAddToLibrary} className={className}>
        <StarIcon className="mr-2 h-4 w-4" />
        Add to library
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <StarFilledIcon className="mr-2 h-4 w-4" />
          Remove from library
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this manga from your library?</DialogTitle>
          <DialogDescription>But remember to drink water ok?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton actionFn={handleRemoveFromLibrary}>Remove from library</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
