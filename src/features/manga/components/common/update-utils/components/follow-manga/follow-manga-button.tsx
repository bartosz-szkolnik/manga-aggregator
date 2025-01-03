'use client';

import { Button } from '@components/ui/button';
import { followManga } from './follow-manga-action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useState, useActionState } from 'react';
import { ActionButton } from '@components/ui/form';
import { ActionResultErrors } from '@utils/types';
import { toast } from 'sonner';
import { exhaustiveCheck } from '@utils/utils';
import { getRandomFollowDialogClosingMessage } from '@lib/dialog-closing-messages';

type FollowMangaButton = {
  mangaId: string;
  className?: string;
  isFollowing: boolean;
};

export function FollowMangaButton({ mangaId, className, isFollowing }: FollowMangaButton) {
  const [open, setOpen] = useState(false);

  const [, submitFollowAction] = useActionState(async () => {
    const { error } = await followManga(mangaId, isFollowing);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`You have followed this manga.`);
  }, null);

  const [, submitUnfollowAction] = useActionState(async () => {
    const { error } = await followManga(mangaId, isFollowing);
    setOpen(false);
    if (error) {
      return handleErrors(error);
    }

    toast.success(`You have unfollowed this manga.`);
  }, null);

  if (!isFollowing) {
    return (
      <ActionButton submitAction={submitFollowAction} className={className}>
        <BookmarkIcon className="mr-2 h-4 w-4" />
        Follow
      </ActionButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className}>
          <BookmarkFilledIcon className="mr-2 h-4 w-4" />
          Unfollow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to unfollow this manga?</DialogTitle>
          <DialogDescription>{getRandomFollowDialogClosingMessage()}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <ActionButton submitAction={submitUnfollowAction}>Unfollow</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function handleErrors(error: ActionResultErrors<typeof followManga>) {
  if (error === 'NOT_SIGNED_IN_ERROR') {
    return toast.error('You need to be signed in to perform this action.');
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    return toast.error('Something went wrong. Please try again.');
  }

  exhaustiveCheck(error);
}
