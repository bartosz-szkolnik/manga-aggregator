'use client';

import { ErrorMessage, FormControl, Input, Label } from '@components/ui/form';
import { HandlerFn } from '@utils/types';
import { ChangeEvent } from 'react';

type ChangeLatestChapterReadProps = {
  latestChapterRead: string;
  latestChapter: string;
  className?: string;
  setValue: HandlerFn<string>;
};

export function ChangeLatestChapterRead({
  latestChapter,
  latestChapterRead,
  className,
  setValue,
}: ChangeLatestChapterReadProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <FormControl controlName="latest-chapter-read" className={className}>
      <Label>Chapters read</Label>
      <div className="flex items-center gap-4">
        <Input className="max-w-16" value={latestChapterRead} onChange={handleChange} />
        <span className="flex-1 text-center"> read out of </span>
        <Input
          setFormAttributes={false}
          className="max-w-16"
          disabled
          defaultValue={latestChapter}
          name="disabled-latest-chapter"
        />
      </div>
      <ErrorMessage />
    </FormControl>
  );
}
