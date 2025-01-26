'use client';

import { Dialog } from '@components/ui/dialog';
import { AddMangaToDatabaseDialogContent } from '@manga/components/common/add-manga-to-database';
import { KEY_A, KONAMI_CODE, useShortcut } from '@utils/hooks';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export function AddMangaViaShortcut() {
  const [open, setOpen] = useState(false);

  useShortcut(`Command+${KEY_A}`, event => {
    event.preventDefault();
    setOpen(open => !open);
  });

  // TODO: Find a better place to place it
  useShortcut(KONAMI_CODE, event => {
    event.preventDefault();
    redirect('/2048');
  });

  return (
    open && (
      <Dialog open={open} onOpenChange={value => setOpen(value)}>
        <AddMangaToDatabaseDialogContent setOpen={setOpen} />
      </Dialog>
    )
  );
}
