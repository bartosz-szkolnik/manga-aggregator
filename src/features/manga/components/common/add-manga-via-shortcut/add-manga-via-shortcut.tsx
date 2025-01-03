'use client';

import { Dialog } from '@components/ui/dialog';
import { AddMangaToDatabaseDialogContent } from '@manga/components/common/add-manga-to-database';
import { KEY_A, useShortcut } from '@utils/hooks';
import { useState } from 'react';

export function AddMangaViaShortcut() {
  const [open, setOpen] = useState(false);

  useShortcut(`Command+${KEY_A}`, event => {
    event.preventDefault();
    setOpen(open => !open);
  });

  return (
    open && (
      <Dialog open={open} onOpenChange={value => setOpen(value)}>
        <AddMangaToDatabaseDialogContent setOpen={setOpen} />
      </Dialog>
    )
  );
}
