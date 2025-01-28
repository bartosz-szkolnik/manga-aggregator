'use client';

import { SheetTriggerWithMetaKey } from '@components/ui/sheet';
import { cn } from '@utils/utils';
import { MangaPortrait, MangaPortraitProps } from './manga-portrait';
import { openMangaDex } from '@manga/utils';

type MangaFigureProps = {
  title: string;
  imageUrl: string;
  mangadexId: string;
  hasProfileManga: boolean;
  isInUserLibrary: boolean;
  size?: MangaPortraitProps['size'];
  className?: string;
  aspectRatio?: 'portrait' | 'square';
  chaptersBehind?: number;
  priority?: boolean;
};

export function MangaFigure(props: MangaFigureProps) {
  const {
    title,
    size = 'default',
    imageUrl,
    mangadexId,
    aspectRatio = 'portrait',
    className,
    hasProfileManga,
    isInUserLibrary,
    chaptersBehind = 0,
    priority = false,
  } = props;

  return (
    <figure className={cn('space-y-3', className)}>
      <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(mangadexId)}>
        <MangaPortrait
          imageUrl={imageUrl}
          title={title}
          aspectRatio={aspectRatio}
          showAnimation
          size={size}
          priority={priority}
        />
      </SheetTriggerWithMetaKey>
      <figcaption className="space-y-1 text-sm">
        <MangaTitle mangadexId={mangadexId} title={title} size={size} />
        <ProgressStatus
          chaptersBehind={chaptersBehind}
          hasProfileManga={hasProfileManga}
          isInUserLibrary={isInUserLibrary}
        />
      </figcaption>
    </figure>
  );
}

type MangaTitleProps = {
  title: string;
  size?: MangaPortraitProps['size'];
  mangadexId: string;
};

function MangaTitle({ mangadexId, title, size }: MangaTitleProps) {
  return (
    <SheetTriggerWithMetaKey className="w-full" customOnClick={() => openMangaDex(mangadexId)}>
      <h3
        className={cn('justify-center text-base font-medium leading-none', size === 'default' ? 'max-w-[250px]' : '')}
      >
        {title}
      </h3>
    </SheetTriggerWithMetaKey>
  );
}

type ProgressBarProps = { chaptersBehind: number; hasProfileManga: boolean; isInUserLibrary: boolean };
function ProgressStatus({ chaptersBehind, hasProfileManga, isInUserLibrary }: ProgressBarProps) {
  if (!isInUserLibrary || !hasProfileManga) {
    return <p className="text-center text-sm text-muted-foreground">Not in your library yet!</p>;
  }

  if (chaptersBehind > 0) {
    return <p className="text-center text-sm text-muted-foreground">You&apos;re behind {chaptersBehind} chapters!</p>;
  }

  return <p className="text-center text-sm text-muted-foreground">You&apos;re all caught up!</p>;
}
