'use client';

import { Button } from '@components/ui/button';
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@components/ui/sheet';
import { openMangaDex } from './manga-utils';

export type MangaDrawerProps = {
  children: React.ReactNode;
  title: string;
  mangaDexId: string;
  description: string;
};

export function MangaDrawer({ children, title, mangaDexId, description }: MangaDrawerProps) {
  return (
    <SheetContent className="flex h-full flex-col overflow-auto">
      <SheetHeader className="mb-2 mt-8">
        <SheetTitle className="cursor-pointer text-center text-2xl" onClick={() => openMangaDex(mangaDexId)}>
          {title}
        </SheetTitle>
        <SheetDescription className="text-justify text-sm">{description}</SheetDescription>
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
