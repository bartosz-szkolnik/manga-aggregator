import { ReadingStatus } from '@lib/types/manga.types';

export const readingStatusToFormatted = {
  dropped: 'Dropped',
  'finished reading': 'Finished reading',
  postponed: 'Postponed',
  reading: 'Reading',
  'want to read': 'Want to read',
  unknown: 'Unknown',
} satisfies Record<ReadingStatus & 'unknown', string>;
