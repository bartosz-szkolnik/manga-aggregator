'use client';

import { FormControlContext, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext } from 'react';

type PageSize = '5' | '10' | '20' | '50';
const sizes = ['5', '10', '20', '50'];

const items = [
  {
    value: '5',
    text: '5',
  },
  {
    value: '10',
    text: '10',
  },
  {
    value: '20',
    text: '20',
  },
  {
    value: '50',
    text: '50',
  },
] satisfies { value: PageSize; text: string }[];

export function PageSizeSelect({ size, className }: { size: string; className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const controlName = useContext(FormControlContext);
  const value = sizes.includes(size) ? (size as PageSize) : '10';

  function handlePageSizeChange(size: PageSize) {
    router.replace(pathname + '?' + createQueryString('size', size));
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      params.set(name, value);
      return params;
    },
    [searchParams],
  );

  return (
    <Select name={controlName} value={value} onValueChange={handlePageSizeChange}>
      <SelectTrigger className={className} id={controlName}>
        <SelectValue placeholder="How many rows can your browser withstand?" />
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
