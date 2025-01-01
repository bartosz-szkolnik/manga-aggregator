'use client';

import { SheetTriggerWithMetaKey } from '@components/ui/sheet';
import { cn } from '@utils/utils';
import { MangaPortrait } from './manga-portrait';
import { openMangaDex } from '@manga/utils';

type MangaFigureProps = {
  title: string;
  imageUrl: string;
  mangadexId: string;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
  chaptersBehind?: number;
  className?: string;
};

export function MangaFigure(props: MangaFigureProps) {
  const { title, imageUrl, mangadexId, width, height, aspectRatio = 'portrait', className, chaptersBehind = 0 } = props;

  return (
    <figure className={cn('space-y-3', className)}>
      <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(mangadexId)}>
        <MangaPortrait
          imageUrl={imageUrl}
          title={title}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
          showAnimation
        />
      </SheetTriggerWithMetaKey>
      <figcaption className="space-y-1 text-sm">
        <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(mangadexId)}>
          <h3 className="justify-center text-base font-medium leading-none">{title}</h3>
        </SheetTriggerWithMetaKey>
        <p className="text-center text-sm text-muted-foreground">
          {chaptersBehind > 0 ? (
            <span>You&apos;re behind {chaptersBehind} chapters</span>
          ) : (
            <span>You&apos;re all caught up!</span>
          )}
        </p>
      </figcaption>
    </figure>
  );
}
