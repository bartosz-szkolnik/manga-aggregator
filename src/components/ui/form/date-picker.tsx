'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@utils/utils';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useContext, useState } from 'react';
import { FormControlContext } from './form-control';
import { useFormStatus } from 'react-dom';

export function DatePicker({ defaultValue }: { defaultValue: string | null }) {
  const [date, setDate] = useState<Date>(new Date(defaultValue ?? new Date()));
  const [value, setInput] = useState(defaultValue);

  const controlName = useContext(FormControlContext);
  const { pending } = useFormStatus();

  function setValue(date: Date | undefined) {
    setDate(date ?? new Date());
    setInput(date?.toISOString() ?? null);
  }

  return (
    <Popover>
      <input hidden readOnly value={value ?? ''} id={controlName} name={controlName} />
      <PopoverTrigger asChild>
        <Button
          disabled={pending}
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setValue} autoFocus />
      </PopoverContent>
    </Popover>
  );
}
