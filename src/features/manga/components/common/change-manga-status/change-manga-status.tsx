import { FormControlContext, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { MangaStatus } from '@manga/types';
import { useContext } from 'react';

const items = [
  { value: 'cancelled', text: 'Cancelled' },
  { value: 'completed', text: 'Completed' },
  { value: 'hiatus', text: 'Hiatus' },
  { value: 'ongoing', text: 'Ongoing' },
  { value: 'unknown', text: 'Unknown' },
] satisfies { value: MangaStatus; text: string }[];

export function ChangeMangaStatusSelect({ mangaStatus }: { mangaStatus: MangaStatus }) {
  const controlName = useContext(FormControlContext);

  return (
    <Select name={controlName} defaultValue={mangaStatus ?? 'ongoing'}>
      <SelectTrigger id={controlName}>
        <SelectValue placeholder="Status of the Manga" />
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
