import { Button } from '@components/ui/button';
import { Manga } from '@lib/types/manga.types';
import { cn } from '@utils/utils';
import Image from 'next/image';

type MangaArtworkProps = React.HTMLAttributes<HTMLDivElement> & {
  manga: Manga;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
};

export function MangaArtwork({
  manga,
  width,
  height,
  aspectRatio = 'portrait',
  className,
  ...props
}: MangaArtworkProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={manga.image_url}
          alt={manga.title}
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105 hover:opacity-50',
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
          )}
        />
        <div className="mt-4 flex items-center justify-between">
          <Button size={'sm'} variant="link">
            Open MangaDex
          </Button>
          <Button size={'sm'} variant="default">
            More...
          </Button>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">
          <a target="_blank" href={`https://mangadex.org/title/${manga.mangadex_id}`}>
            {manga.title}
          </a>
        </h3>
        <p className="text-xs text-muted-foreground">You&apos;re behind 3 chapters</p>
      </div>
    </div>
  );
}
