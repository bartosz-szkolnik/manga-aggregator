import { ReadingStatus } from '@manga/types';

const readingStatusToFormatted = {
  dropped: 'Dropped',
  'finished reading': 'Finished reading',
  postponed: 'Postponed',
  reading: 'Reading',
  'want to read': 'Want to read',
  unknown: 'Unknown',
} satisfies Record<ReadingStatus & 'unknown', string>;

export function formatReadingStatus(status?: ReadingStatus | null) {
  return readingStatusToFormatted[status ?? 'unknown'];
}
