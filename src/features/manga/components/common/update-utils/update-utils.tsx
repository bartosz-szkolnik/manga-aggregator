import { Manga, ProfileManga } from '@lib/types';
import { AddMangaToUserLibraryButton } from './components/add-manga-to-user-library';
import { FollowMangaButton } from './components/follow-manga';
import { FavoriteMangaButton } from './components/favorite-manga';

type MangaUpdateUtilsProps = {
  mangaId: Manga['id'];
  isInLibrary?: ProfileManga['isInLibrary'];
  isFollowing?: ProfileManga['isFollowing'];
  isFavorite?: ProfileManga['isFavorite'];
};

export function MangaUpdateUtils({ isFavorite, isFollowing, isInLibrary, mangaId }: MangaUpdateUtilsProps) {
  return (
    <>
      <AddMangaToUserLibraryButton mangaId={mangaId} isInLibrary={isInLibrary ?? false} />
      {isInLibrary && <FollowMangaButton mangaId={mangaId} isFollowing={isFollowing ?? false} />}
      {isInLibrary && <FavoriteMangaButton mangaId={mangaId} isFavorite={isFavorite ?? false} />}
    </>
  );
}
