import { FilterInput } from '@components/table';
import { FormControl, Label } from '@components/ui/form';

export function TitleFilter({ onlyFilterSearchParam }: { onlyFilterSearchParam?: boolean }) {
  return (
    <FormControl className="w-[500px]" controlName="filter">
      <Label>Filter results by title</Label>
      <FilterInput onlyFilterSearchParam={onlyFilterSearchParam ?? false} />
    </FormControl>
  );
}
