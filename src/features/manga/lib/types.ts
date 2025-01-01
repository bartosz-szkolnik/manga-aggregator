import { Manga, ProfileManga, UnCamelCasedManga, UnCamelCasedProfileManga } from '@lib/types';

type PartialUnCamelCasedProfileManga = Partial<
  Pick<
    UnCamelCasedProfileManga,
    'latest_chapter_read' | 'is_in_library' | 'reading_status' | 'priority' | 'is_following' | 'is_favorite'
  >
>;

export type CombinedUnCamelCasedManga = (UnCamelCasedManga & { profile_manga: PartialUnCamelCasedProfileManga[] })[];

// ---

type PartialProfileManga = Partial<
  Pick<ProfileManga, 'latestChapterRead' | 'isInLibrary' | 'readingStatus' | 'priority' | 'isFollowing' | 'isFavorite'>
>;

export type CombinedManga = Manga & PartialProfileManga & { hasProfileManga: boolean };

export type MangaGridResponse = {
  data: CombinedManga[];
  total: number;
  offset: number;
};

export type MangaTableResponse = {
  data: CombinedManga[];
  size: number;
  page: number;
  amountOfPages: number;
};
