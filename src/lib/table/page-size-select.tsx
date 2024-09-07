import { PageSizeSelect } from '@components/table';
import { FormControl, Label } from '@components/ui/form';

export function TablePageSizeSelect({ size }: { size: number }) {
  return (
    <FormControl className="w-[100px]" controlName="page-size">
      <Label>Page size</Label>
      <PageSizeSelect size={String(size)} />
    </FormControl>
  );
}
