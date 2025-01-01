'use client';

import { FormControlContext, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { ReadingStatus } from '@manga/types';
import { HandlerFn } from '@utils/types';
import { useContext } from 'react';

const items = [
  { value: 'reading', text: 'Reading' },
  { value: 'want to read', text: 'Want to read' },
  { value: 'finished reading', text: 'Finished reading' },
  { value: 'postponed', text: 'Postponed' },
  { value: 'dropped', text: 'Dropped' },
] satisfies { value: ReadingStatus; text: string }[];

type ChangeReadingStatusSelectProps = {
  readingStatus: ReadingStatus;
  setValue: HandlerFn<ReadingStatus>;
};

export function ChangeReadingStatusSelect({ readingStatus, setValue }: ChangeReadingStatusSelectProps) {
  const controlName = useContext(FormControlContext);

  function handleChange(value: string) {
    setValue(value as ReadingStatus);
  }

  return (
    <Select name={controlName} value={readingStatus} onValueChange={handleChange}>
      <SelectTrigger id={controlName}>
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
