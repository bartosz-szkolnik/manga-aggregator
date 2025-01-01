'use client';

import { SheetTriggerWithMetaKey } from '@components/ui/sheet';
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
      <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(manga.mangadex_id)}>
        <MangaImage
          imageUrl={manga.image_url}
          title={manga.title}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
        />
      </SheetTriggerWithMetaKey>
      <figcaption className="space-y-1 text-sm">
        <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(manga.mangadex_id)}>
          <h3 className="justify-center text-base font-medium leading-none">{manga.title}</h3>
        </SheetTriggerWithMetaKey>
        {chaptersBehind > 0 ? (
          <p className="text-center text-sm text-muted-foreground">You&apos;re behind {chaptersBehind} chapters</p>
        ) : (
          <p className="text-center text-sm text-muted-foreground">You&apos;re all caught up!</p>
        )}
      </figcaption>
    </figure>
  );
}
