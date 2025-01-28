import { Sheet } from '@components/ui/sheet';
import { MangaFigure } from './manga-figure';
import { MangaPortrait, MangaPortraitProps } from './manga-portrait';
import { MangaSheet } from './manga-sheet';
import { OpenMangaDexButton } from '@manga/components/common/open-mangadex-button';
import { MangaGridResponse } from '@manga/lib/types';
import { ReactNode } from 'react';
import { getMangaChaptersBehind } from '@manga/utils';

type MangaArtworkProps = {
  manga: MangaGridResponse['data'][number];
  sizeOfMangas?: MangaPortraitProps['size'];
  children?: ReactNode;
  priority?: boolean;
};

export function MangaArtwork({ manga, children, sizeOfMangas = 'default', priority = false }: MangaArtworkProps) {
  const { title, imageUrl, mangadexId, description, latestChapter, latestChapterRead, hasProfileManga, isInLibrary } =
    manga;
  const chaptersBehind = getMangaChaptersBehind(latestChapter, latestChapterRead);

  return (
    <Sheet key={mangadexId}>
      <MangaFigure
        title={title}
        imageUrl={imageUrl}
        size={sizeOfMangas}
        priority={priority}
        mangadexId={mangadexId}
        chaptersBehind={chaptersBehind}
        hasProfileManga={hasProfileManga}
        isInUserLibrary={isInLibrary ?? false}
      />
      <MangaSheet mangaDexId={mangadexId} title={title} description={description}>
        <div className="mt-4">
          <MangaPortrait imageUrl={imageUrl} title={title} size="lg" />
        </div>
        <div className="mt-4 grid gap-4 py-4">
          <OpenMangaDexButton id={mangadexId} className="w-full" />
          {children}
        </div>
      </MangaSheet>
    </Sheet>
  );
}
