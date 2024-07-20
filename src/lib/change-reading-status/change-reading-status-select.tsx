import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { CurrentReadingStatus } from '@lib/types/manga.types';

const items = [
  {
    value: 'reading',
    text: 'Reading',
  },
  {
    value: 'want to read',
    text: 'Want to read',
  },
  {
    value: 'finished reading',
    text: 'Finished reading',
  },
  {
    value: 'postponed',
    text: 'Postponed',
  },
  {
    value: 'dropped',
    text: 'Dropped',
  },
] satisfies { value: CurrentReadingStatus; text: string }[];

export function ChangeReadingStatusSelect({
  readingStatus,
  name = 'reading-status',
}: {
  readingStatus: CurrentReadingStatus;
  name?: string;
}) {
  return (
    <Select name={name} defaultValue={readingStatus ?? 'want to read'}>
      <SelectTrigger>
        <SelectValue placeholder="Your current reading status" />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ text, value }) => (
          <SelectItem key={value} value={value}>
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
