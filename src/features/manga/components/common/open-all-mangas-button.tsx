'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { openMangaDex } from '@lib/manga/manga-utils';
import { Manga } from '@lib/types/manga.types';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

type OpenAllMangasButton = {
  mangaIds: Array<Manga['id']>;
};

export function OpenAllMangasButton({ mangaIds }: OpenAllMangasButton) {
  const [open, setOpen] = useState(false);

  function handleOnClick() {
    setOpen(false);
    mangaIds.forEach(id => openMangaDex(id));
  }

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button disabled={mangaIds.length === 0}>
          <ExternalLink className="mr-2" />
          Open all in new tabs
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Are you sure you want to open multiple tabs at once? </DialogTitle>
          <DialogDescription>
            If you do, there&apos;ll probably be an icon next to your address bar where you&apos;ll have to allow
            opening multiple tabs from this domain. Just so you know.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            No, let&apos;s not do that
          </Button>
          <Button onClick={handleOnClick}>Show me what you got!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
