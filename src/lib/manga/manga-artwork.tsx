'use client';

import { CustomLogicSheetTrigger } from '@components/ui/sheet';
import { Manga } from '@lib/types/manga.types';
import { cn } from '@utils/utils';
import Image from 'next/image';
import { openMangaDex } from './manga-utils';

type MangaArtworkProps = React.HTMLAttributes<HTMLDivElement> & {
  manga: Manga;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
  chaptersBehind?: number;
};

export function MangaArtwork({
  manga,
  width,
  height,
  aspectRatio = 'portrait',
  className,
  chaptersBehind = 0,
  ...props
}: MangaArtworkProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <CustomLogicSheetTrigger customOnClick={() => openMangaDex(manga.mangadex_id)}>
          <Image
            priority
            src={manga.image_url}
            alt={manga.title}
            width={width}
            height={height}
            className={cn(
              'h-auto w-auto object-cover transition-all hover:scale-105 hover:opacity-50',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )}
          />
        </CustomLogicSheetTrigger>
        <div className="mt-4 flex items-center justify-between"></div>
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="justify-center font-medium leading-none">
          <CustomLogicSheetTrigger className="w-full" customOnClick={() => openMangaDex(manga.mangadex_id)}>
            {manga.title}
          </CustomLogicSheetTrigger>
        </h3>
        {chaptersBehind > 0 ? (
          <p className="text-center text-xs text-muted-foreground">You&apos;re behind {chaptersBehind} chapters</p>
        ) : (
          <p className="text-center text-xs text-muted-foreground">You&apos;re all caught up!</p>
        )}
      </div>
    </div>
  );
}

{
  /* Click again with the {getTheMetaSymbol()} button pressed, you can open this manga on MangaDex directly */
}
function getTheMetaSymbol() {
  return (
    <span className="text-sm text-muted-foreground">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
      </kbd>
    </span>
  );
}
