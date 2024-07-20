'use client';

import { Button } from '@components/ui/button';
import { followManga } from './follow-manga-action';
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

export function FollowMangaButton({
  mangaId,
  className,
  isFollowing,
}: {
  mangaId: string;
  className?: string;
  isFollowing: boolean;
}) {
  const [open, setOpen] = useState(false);

  async function handleFollowManga() {
    const { error } = await followManga(mangaId, isFollowing);
    if (error) {
      console.error(error);
    } else {
      console.info(`You have followed this manga.`);
    }
  }

  async function handleUnFollowManga() {
    const { error } = await followManga(mangaId, isFollowing);
    setOpen(false);

    if (error) {
      console.error(error);
    } else {
      console.info(`You have unfollowed this manga.`);
    }
  }

  if (!isFollowing) {
    return (
      <ActionButton actionFn={handleFollowManga} className={className}>
        <StarIcon className="mr-2 h-4 w-4" />
        Follow
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <StarFilledIcon className="mr-2 h-4 w-4" />
          Unfollow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to unfollow this manga?</DialogTitle>
          <DialogDescription>
            What about all the memories you&apos;ve made with it? All of the characters? Don&apos;t make the main
            heroine cry.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton actionFn={handleUnFollowManga}>Unfollow</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
