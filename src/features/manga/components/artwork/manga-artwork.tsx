import { Sheet } from '@components/ui/sheet';
import { MangaFigure } from './manga-figure';
import { MangaPortrait } from './manga-portrait';
import { MangaSheet } from './manga-sheet';
import { UpdateProgressForm } from '@manga/components/common/update-progress';
import { OpenMangaDexButton } from '@manga/components/common/open-mangadex-button';
import { MangaUpdateUtils } from '../common/update-utils';
import { MangaGridResponse } from '@manga/lib/types';

type MangaArtworkProps = {
  manga: MangaGridResponse['data'][number];
};

export function MangaArtwork({ manga }: MangaArtworkProps) {
  const {
    id,
    title,
    imageUrl,
    priority,
    isFavorite,
    isFollowing,
    readingStatus,
    mangadexId,
    latestChapter,
    description,
    latestChapterRead,
    isInLibrary: isInUserLibrary,
  } = manga;
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
          <MangaUpdateUtils
            isFavorite={isFavorite}
            mangaId={id}
            isFollowing={isFollowing}
            isInLibrary={isInUserLibrary}
          />
          {isInUserLibrary && (
            <UpdateProgressForm
              mangaId={id}
              priority={priority ?? 'normal'}
              latestChapter={latestChapter ?? '0'}
              readingStatus={readingStatus ?? 'want to read'}
              latestChapterRead={latestChapterRead ?? '0'}
            />
          )}
        </div>
      </MangaSheet>
    </Sheet>
  );
}
