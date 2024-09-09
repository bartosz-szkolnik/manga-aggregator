'use client';

import { Dialog } from '@components/ui/dialog';
import { AddMangaToDatabaseDialogContent } from '@lib/add-manga-to-database';
import { useEffect, useState } from 'react';

export function AddMangaViaShortcut() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    open && (
      <Dialog open={open} onOpenChange={value => setOpen(value)}>
        <AddMangaToDatabaseDialogContent setOpen={setOpen} />;
      </Dialog>
    )
  );
}
