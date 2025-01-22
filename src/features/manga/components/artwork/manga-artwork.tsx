import { Sheet } from '@components/ui/sheet';
import { MangaFigure } from './manga-figure';
import { MangaPortrait } from './manga-portrait';
import { MangaSheet } from './manga-sheet';
import { OpenMangaDexButton } from '@manga/components/common/open-mangadex-button';
import { MangaGridResponse } from '@manga/lib/types';
import { ReactNode } from 'react';

type MangaArtworkProps = {
  manga: MangaGridResponse['data'][number];
  children?: ReactNode;
};

export function MangaArtwork({ manga, children }: MangaArtworkProps) {
  const { title, imageUrl, mangadexId, description, latestChapter, latestChapterRead } = manga;
  const chaptersBehind = Number(latestChapter ?? 0) - Number(latestChapterRead ?? 0);

  return (
    <Sheet key={mangadexId}>
      <MangaFigure title={title} imageUrl={imageUrl} mangadexId={mangadexId} chaptersBehind={chaptersBehind} />
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
