import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { replaceImageUrlToUseImageProxy } from '@utils/utils';

export type MangaPortraitProps = {
  imageUrl: string;
  title: string;
  size?: 'default' | 'lg' | 'responsive';
  aspectRatio?: 'portrait' | 'square';
  showAnimation?: boolean;
  priority?: boolean;
};

const containerVariants = cva('relative w-full overflow-hidden rounded-md shadow-lg', {
  variants: {
    size: {
      default: 'min-w-[250px] max-w-[250px] h-[330px]',
      lg: 'w-[400px] h-[500px]',
      // sm: 'w-[50px] h-[130px]',
      // md: 'w-[210px] h-[280px]',
      // lg: 'w-[250px] h-[350px]',
      // xl: 'w-[400px] h-[500px]',
      responsive: 'min-w-[125px] min-h-[275px] md:min-h-[330px] max-w-[550px] md:max-w-[515px] lg:max-w-[350px]',
    },
    defaultVariants: {
      size: 'default',
    },
  },
});

const portraitVariants = cva('w-full object-cover', {
  variants: {
    showAnimation: {
      true: 'hover:scale-105 hover:opacity-50',
      false: '',
    },
    aspectRatio: {
      portrait: 'aspect-[3/4]',
      square: 'aspect-square',
    },
  },
  defaultVariants: {
    showAnimation: false,
    aspectRatio: 'portrait',
  },
});

export function MangaPortrait(props: MangaPortraitProps) {
  const { title, aspectRatio, imageUrl, showAnimation, size = 'default' } = props;
  const proxiedImageUrl = replaceImageUrlToUseImageProxy(imageUrl);
  const minimizedImageUrl = `${proxiedImageUrl}.${size === 'lg' ? '512' : '256'}.jpg`;

  return (
    <div className={containerVariants({ size })}>
      <Image
        fill
        unoptimized
        priority={props.priority ?? false}
        src={minimizedImageUrl}
        alt={title}
        className={portraitVariants({ aspectRatio, showAnimation })}
      />
    </div>
  );
}
