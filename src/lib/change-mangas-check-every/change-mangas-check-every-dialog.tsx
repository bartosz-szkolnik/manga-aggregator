import {
  ErrorMessage,
  FormControl,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/form';
import { Period } from '@lib/types/manga.types';

const items = [
  { value: 'months', text: 'Month(s)' },
  { value: 'weeks', text: 'Week(s)' },
  { value: 'days', text: 'Day(s)' },
] satisfies { value: Period; text: string }[];

export function CheckEveryFormControl({ numberOf, period }: { numberOf: string; period: Period }) {
  return (
    <div>
      <div className="flex gap-4">
        <FormControl controlName="check-every-number">
          <Label>Check every</Label>
          <Input placeholder="Number of..." defaultValue={numberOf} />
          <ErrorMessage />
        </FormControl>
        <div className="w-full">
          {/* this thing is to position the select properly, aligned with the input in the x axis */}
          <div className="h-[24px]" />
          <Select name="check-every-period" defaultValue={period}>
            <SelectTrigger id="check-every-period">
              <SelectValue placeholder="Change the period" />
            </SelectTrigger>
            <SelectContent>
              {items.map(({ text, value }) => (
                <SelectItem key={value} value={value}>
                  {text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
