import { MangaPortrait, MangaSheet } from '../artwork';
import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { ChevronRight } from 'lucide-react';
import { OpenMangaDexButton } from '@manga/components/common/open-mangadex-button';
import { UpdateProgressForm } from '@manga/components/common/update-progress';
import { MangaTableResponse } from '@manga/lib/types';
import { AddMangaToUserLibraryButton } from '../common/update-utils/components/add-manga-to-user-library';
import { FollowMangaButton } from '../common/update-utils/components/follow-manga';
import { FavoriteMangaButton } from '../common/update-utils/components/favorite-manga';

type MangaTableSheetProps = {
  manga: MangaTableResponse['data'][number];
};

export function MangaTableSheet({ manga }: MangaTableSheetProps) {
  const { id, title, mangadexId, isFavorite, isFollowing, description, isInLibrary: isInUserLibrary } = manga;

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
          <MangaPortrait imageUrl={manga.imageUrl} title={manga.title} size="lg" />
        </div>
        <div className="mt-4 grid gap-4 py-4">
          <OpenMangaDexButton id={mangadexId} className="w-full"></OpenMangaDexButton>
          <AddMangaToUserLibraryButton mangaId={id} isInLibrary={isInUserLibrary ?? false} />
          {isInUserLibrary && <FollowMangaButton mangaId={id} isFollowing={isFollowing ?? false} />}
          {isInUserLibrary && <FavoriteMangaButton mangaId={id} isFavorite={isFavorite ?? false} />}
          {isInUserLibrary && <UpdateProgressForm manga={manga} />}
        </div>
      </MangaSheet>
    </Sheet>
  );
}
