import { FilterInput } from '@components/table';
import { FormControl, Label } from '@components/ui/form';

export function TitleFilter() {
  return (
    <FormControl className="w-[500px]" controlName="filter">
      <Label>Filter results by title</Label>
      <FilterInput />
    </FormControl>
  );
}
