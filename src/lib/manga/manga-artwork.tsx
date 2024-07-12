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
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{manga.title}</h3>
        <p className="text-xs text-muted-foreground">Updated ...</p>
      </div>
    </div>
  );
}
