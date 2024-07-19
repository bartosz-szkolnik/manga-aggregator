'use client';

import { Button } from '@components/ui/button';
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@components/ui/sheet';
import { openMangaDex } from './manga-utils';

export type MangaDrawerProps = {
  children: React.ReactNode;
  title: string;
  mangaDexId: string;
};

export function MangaDrawer({ children, title, mangaDexId }: MangaDrawerProps) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="cursor-pointer" onClick={() => openMangaDex(mangaDexId)}>
          {title}
        </SheetTitle>
        <SheetDescription>You can do some things in here...</SheetDescription>
      </SheetHeader>
      {children}
      <SheetFooter className="absolute bottom-4 left-4">
        <SheetClose asChild>
          <Button>Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
