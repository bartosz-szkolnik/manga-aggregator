import { FormControlContext, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { ReadingStatus } from '@lib/types/manga.types';
import { useContext } from 'react';

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
] satisfies { value: ReadingStatus; text: string }[];

export function ChangeReadingStatusSelect({ readingStatus }: { readingStatus: ReadingStatus }) {
  const controlName = useContext(FormControlContext);
  return (
    <Select name={controlName} defaultValue={readingStatus ?? 'want to read'}>
      <SelectTrigger>
        <SelectValue placeholder="Your reading status" />
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
