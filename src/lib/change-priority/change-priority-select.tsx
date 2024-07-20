import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { Priority } from '@lib/types/manga.types';

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

export function ChangePrioritySelect({ priority, name = 'priority' }: { priority: Priority; name?: string }) {
  return (
    <Select name={name} defaultValue={priority ?? 'normal'}>
      <SelectTrigger>
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
