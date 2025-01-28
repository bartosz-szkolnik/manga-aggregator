import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { MangaArtwork } from '@manga/components/artwork';
import { CombinedManga } from '@manga/lib/types';
import { ShowMoreButton } from '../show-more-button';
import { AddMangaToUserLibraryButton } from '@manga/components/common/add-manga-to-user-library';
import { FollowMangaButton } from '@manga/components/common/follow-manga';
import { FavoriteMangaButton } from '@manga/components/common/favorite-manga';
import { UpdateProgressForm } from '@manga/components/common/update-progress';

export function MangaScrollArea({ data, href }: { data: CombinedManga[]; href: string }) {
  return (
    <ScrollArea>
      <div className="flex space-x-4 pb-4">
        {data.map(manga => {
          const { id, isInLibrary: isInUserLibrary, isFavorite, isFollowing } = manga;
          return (
            <MangaArtwork key={manga.id} manga={manga} priority>
              <AddMangaToUserLibraryButton mangaId={id} isInLibrary={isInUserLibrary ?? false} setCookie />
              {isInUserLibrary && <FollowMangaButton mangaId={id} isFollowing={isFollowing ?? false} setCookie />}
              {isInUserLibrary && <FavoriteMangaButton mangaId={id} isFavorite={isFavorite ?? false} setCookie />}
              {isInUserLibrary && <UpdateProgressForm manga={manga} setCookie />}
            </MangaArtwork>
          );
        })}
        <ShowMoreButton href={href} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
