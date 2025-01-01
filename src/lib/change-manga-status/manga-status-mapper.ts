import { MangaStatus } from '@lib/types/manga.types';

const mangaStatusToFormatted = {
  cancelled: 'Cancelled',
  completed: 'Completed',
  hiatus: 'Hiatus',
  ongoing: 'Ongoing',
  unknown: 'Unknown',
} satisfies Record<MangaStatus, string>;

export function formatMangaStatus(status: MangaStatus | null) {
  return mangaStatusToFormatted[status ?? 'unknown'];
}
