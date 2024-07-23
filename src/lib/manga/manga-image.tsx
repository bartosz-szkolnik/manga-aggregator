import { cn } from '@utils/utils';
import Image from 'next/image';

type MangaImageProps = {
  imageUrl: string;
  title: string;
  width?: number;
  height?: number;
  aspectRatio?: 'portrait' | 'square';
  showAnimation?: boolean;
};

export function MangaImage({
  title,
  aspectRatio = 'portrait',
  height,
  imageUrl,
  width,
  showAnimation = true,
}: MangaImageProps) {
  return (
    <div className="overflow-hidden rounded-md shadow-lg">
      <Image
        priority
        src={imageUrl}
        alt={title}
        width={width}
        height={height}
        className={cn(
          'h-auto w-auto object-cover transition-all',
          showAnimation ? 'hover:scale-105 hover:opacity-50' : '',
          aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
        )}
      />
    </div>
  );
}
