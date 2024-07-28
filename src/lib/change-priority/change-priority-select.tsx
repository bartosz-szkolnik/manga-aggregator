import { FormControlContext, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { Priority } from '@lib/types/manga.types';
import { useContext } from 'react';

const items = [
  {
    value: 'high',
    text: 'High',
  },
  {
    value: 'normal',
    text: 'Normal',
  },
  {
    value: 'low',
    text: 'Low',
  },
] satisfies { value: Priority; text: string }[];

export function ChangePrioritySelect({ priority }: { priority: Priority }) {
  const controlName = useContext(FormControlContext);

  return (
    <Select name={controlName} defaultValue={priority ?? 'normal'}>
      <SelectTrigger id={controlName}>
        <SelectValue placeholder="How badly you want to read this manga?" />
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
