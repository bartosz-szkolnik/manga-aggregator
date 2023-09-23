'use client';

import Image from 'next/image';
import { cn } from '../../lib/utils';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu';
import { useTransition } from 'react';
import { addToLibraryAction } from '../../actions/add-to-library-action';
import { Manga } from '../../lib/types';

type MangaArtworkProps = React.HTMLAttributes<HTMLDivElement> & {
  manga: Manga;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
};

export function MangaArtwork({
  manga,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: MangaArtworkProps) {
  let [, startTransition] = useTransition();

  async function addToLibrary() {
    startTransition(() => addToLibraryAction(manga.id));
  }

  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={manga.image_url}
              alt={manga.title}
              width={width}
              height={height}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onClick={addToLibrary}>Add to Library</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{manga.title}</h3>
        <p className="text-xs text-muted-foreground">{manga.last_time_checked}</p>
      </div>
    </div>
  );
}
