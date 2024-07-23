'use client';

import { CustomLogicSheetTrigger } from '@components/ui/sheet';
import { Manga } from '@lib/types/manga.types';
import { cn } from '@utils/utils';
import { openMangaDex } from './manga-utils';
import { MangaImage } from './manga-image';

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
    <figure className={cn('space-y-3', className)} {...props}>
      <CustomLogicSheetTrigger customOnClick={() => openMangaDex(manga.mangadex_id)}>
        <MangaImage
          imageUrl={manga.image_url}
          title={manga.title}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
        />
      </CustomLogicSheetTrigger>
      <figcaption className="space-y-1 text-sm">
        <CustomLogicSheetTrigger className="w-full" customOnClick={() => openMangaDex(manga.mangadex_id)}>
          <h3 className="justify-center text-base font-medium leading-none">{manga.title}</h3>
        </CustomLogicSheetTrigger>
        {chaptersBehind > 0 ? (
          <p className="text-center text-sm text-muted-foreground">You&apos;re behind {chaptersBehind} chapters</p>
        ) : (
          <p className="text-center text-sm text-muted-foreground">You&apos;re all caught up!</p>
        )}
      </figcaption>
    </figure>
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
