import { MangaPortrait, MangaSheet } from '../artwork';
import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { ChevronRight } from 'lucide-react';
import { OpenMangaDexButton } from '@manga/components/common/open-mangadex-button';
import { UpdateProgressForm } from '@manga/components/common/update-progress';
import { MangaUpdateUtils } from '../common/update-utils';
import { MangaTableResponse } from '@manga/lib/types';

type MangaTableSheetProps = {
  manga: MangaTableResponse['data'][number];
};

export function MangaTableSheet({ manga }: MangaTableSheetProps) {
  const {
    id,
    title,
    priority,
    mangadexId,
    isFavorite,
    isFollowing,
    description,
    latestChapter,
    readingStatus,
    latestChapterRead,
    isInLibrary: isInUserLibrary,
  } = manga;

  return (
    <Sheet key={mangadexId}>
      <SheetTrigger asChild>
        <Button size="xs">
          Open
          <ChevronRight />
        </Button>
      </SheetTrigger>
      <MangaSheet mangaDexId={mangadexId} title={title} description={description}>
        <div className="mt-4">
          <MangaPortrait imageUrl={manga.imageUrl} title={manga.title} width={210} height={280} />
        </div>
        <div className="mt-4 grid gap-4 py-4">
          <OpenMangaDexButton id={mangadexId} className="w-full"></OpenMangaDexButton>
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
              latestChapterRead={latestChapterRead ?? '0'}
              readingStatus={readingStatus ?? 'want to read'}
            />
          )}
        </div>
      </MangaSheet>
    </Sheet>
  );
}
