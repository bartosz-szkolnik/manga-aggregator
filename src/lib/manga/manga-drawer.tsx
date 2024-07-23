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
    <SheetContent className="flex h-full flex-col overflow-auto">
      <SheetHeader>
        <SheetTitle className="cursor-pointer" onClick={() => openMangaDex(mangaDexId)}>
          {title}
        </SheetTitle>
        <SheetDescription>You can do some things in here...</SheetDescription>
      </SheetHeader>
      <div className="flex-1">{children}</div>
      <SheetFooter className="flex flex-col sm:justify-start">
        <SheetClose asChild>
          <Button>Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
