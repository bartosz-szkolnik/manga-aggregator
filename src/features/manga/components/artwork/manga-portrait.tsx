import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { replaceImageUrlToUseImageProxy } from '@utils/utils';

type MangaPortraitProps = {
  imageUrl: string;
  title: string;
  size?: 'default' | 'lg' | 'responsive';
  aspectRatio?: 'portrait' | 'square';
  showAnimation?: boolean;
};

const containerVariants = cva('relative w-full overflow-hidden rounded-md shadow-lg', {
  variants: {
    size: {
      default: 'w-[250px] h-[330px]',
      lg: 'w-[400px] h-[500px]',
      // sm: 'w-[50px] h-[130px]',
      // md: 'w-[210px] h-[280px]',
      // lg: 'w-[250px] h-[350px]',
      // xl: 'w-[400px] h-[500px]',
      responsive: 'min-w-[250px] min-h-[330px] max-w-[550px] md:max-w-[515px] lg:max-w-[350px]',
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
  const replacedImageUrl = replaceImageUrlToUseImageProxy(imageUrl);
  const betterImageUrl = `${replacedImageUrl}.256.jpg`;

  return (
    <div className={containerVariants({ size })}>
      {/* Should priority be checked? */}
      <Image
        priority
        unoptimized
        src={betterImageUrl}
        alt={title}
        fill
        placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFZ0lEQVRYR2WXeZPcNBDFLc/sfuXNAYGE7PLv5IYEEnJQhOIIn2/HtnhHtyRXtkol2zvW+/XrliyVm0//1Ql/M9qhoOHiiP4C/QX6I/u56tmxVPymTjOuC/oy6dVpqnXa0G24ZVtrmRY8WNijnbe5XfN/avF2uQYAxusAKRoQAoAYe4pn4zsGMESKs18SogEQZA+x8W38rlx/NEBh9IoyWgjTCUZOgO4AXIAw3yOAMOiCIoMDQ/SjcF7TAf6WrpXHAcAU0FqJZfS4bgB6nikgQHcgfbD9kYKIvgPYgX0KCgA+fHEN0IGoAwop/wKwcDbVAKMfawD3SoFSYRHnP21Hj7cMMCv/zYFH77+4BjRwd0DiGFj5b9FvLkI8TwilAOKMggBZYBRqABJ3W3GtFKiC4MDD3/6NGoC9BMBjCY7i+LkhthBH3xyIGsjoMSgjFEAKY+S8/wrg+3f/xDQ0ACMUBETpAEV5rTYCRBpaEcqBLi4hAmBUtYw+njcHHrz92w5gwEM0RZ+iBKmwXvcYUhB2wsZ7GioFmEopvDLqAYD3BOEzjxAp+PbXv5RB1FoAQAhJddSrxNkfBJHDJgCzLnoXIAcukefiXy98G9cWR8P1DuD+mz9jISKEXThStK7qL/Aarw8VQ7DX66rjthBxABYUxQ1gobUcpwXN97jm2wJrZTyVe68/OwUhzkhT/LhRHDGMALi3gbmYoggJAPsNYDEDAD8hGghDQJj4rWbB3Z//0DwSEyESgOIJsBGCDkBcLR2g8QRAPtUQ/cwoATCnuHvDGI6guZaWO69+9ywgBPNMAAkTAMJq5+mAXgDoNcHwf9jm8pMDiH6mAxSHiAAupiV6Q1Dc7ggA0OXq5Sc4CDMEAAcy8iYOYQAY4hwOLJGCXoRV4oge4ga4DBcGCD4nhGohUnD14sPeAQAYApGvEf06AiQEHXAK+CUTAO3P6Bm5INBof3PChVjlAh14/r7XwMYUAGA1wCGEj+gZvVolwBmOuQ6Uhh0AVpBRPK8bBF3wXHIKnr3TWqqyaADO/UEO3MIJit82CBYiPjVfAVRFzxRcRgouXQM7FwYAqJarp2+HGoADmYKd/RBPCDnQAfhV7A64+PYOOAWLILIQwwEC3HnyS1sHNAsEwMKLGbA6chfhreznbEgHuJHRLED+mVeLE4LRU9TFuGga9qnIWcClu9x98qYqCGZFAGwDQAj3WQAA2o8amAsLkQBeAwixQSQhLA4QOhCLklwYZ8H902t9CzwNvQ7knO9rQDgQ0ftDG4tRpqAB9DWAAF2cEBRnGvKDhBR8c/ppNw0NEbOAyzDtD2HOAH0TGoB3RnaALaZhsxui+JpQWCD+rHlFjF1leXB6JYDmAJcJ1kH7BhAgluKJAPmRxfcA64AAmIf4ENUoNFtt6yncW35TufzBge9OL6MGVBaRBgLIrEHcQ5g9Wu6KWIl0oH3t4oNEgBBHGG1z4n2hP2nl4emF1gHzGCLFG0QMk+yCiN1Rd8AjeJGJfYB2Qkf4ZvFzjX3BCPDo9LxNw4hB33yKRMnsr1H5msUEGB2IHY73TrEZgaDE1ROGELkxZagI/AcB+JCRWy0P4Z3QEYLZ6xnu5VID8KbIKYjq1obUghbt4gTx2SAArk/PXIQtBTx8eBN6kLhFvTlF9OhTvJ8P+gjaqkDQ2/JBOKKnA9qg5snoRgDpAA+e2q8YQi0hfJ8A7PM8kRtDbcsUWT8HLJttpws8pBrAhxcV4c3padsV63yoyLsLgpi7eEKoYHlI8QFRf1WDMjo3RuqT8TzdBsiy4bQ8OvAjAJqBceppAM2FcAMgdsCbVxehD7YNII5eawgreoor+v1RnQ78D9WO/NgI6VSLAAAAAElFTkSuQmCC"
        className={portraitVariants({ aspectRatio, showAnimation })}
      />
    </div>
  );
}
