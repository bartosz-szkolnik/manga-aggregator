'use client';

import { Button } from '@components/ui/button';
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@components/ui/sheet';
import { openMangaDex } from '@manga/utils';
import { useIsMobile } from '@utils/hooks/is-mobile';
import { cn } from '@utils/utils';

export type MangaSheetProps = {
  children: React.ReactNode;
  title: string;
  mangaDexId: string;
  description: string;
};

export function MangaSheet({ children, title, mangaDexId, description }: MangaSheetProps) {
  const isMobile = useIsMobile();

  return (
    <SheetContent className={cn('flex h-full flex-col overflow-auto', { 'w-full': isMobile })}>
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
