import { MangaStatus } from '@lib/types/manga.types';

export const mangaStatusToFormatted = {
  cancelled: 'Cancelled',
  completed: 'Completed',
  hiatus: 'Hiatus',
  ongoing: 'Ongoing',
  unknown: 'Unknown',
} satisfies Record<MangaStatus, string>;
