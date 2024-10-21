'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/form';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@utils/hooks/debounce';

const DELAY_300MS = 300;
let VALUE_ENTERED = false;

export function FilterInput({ onlyFilterSearchParam }: { onlyFilterSearchParam: boolean }) {
  const searchParams = useSearchParams();
  const [, value] = searchParams.toString().split(`filter=`);

  const pathname = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState(value ?? '');
  const debouncedFilter = useDebounce(filter, DELAY_300MS);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (onlyFilterSearchParam) {
        params.set(name, value);
        return params.toString();
      }

      const oldFilter = params.get('filter');
      if (oldFilter !== value) {
        params.set('page', '1');
      }
      params.set('size', params.get('size') ?? '10');
      params.set(name, value);

      return params.toString();
    },
    [searchParams, onlyFilterSearchParam],
  );

  function handleFilterChange(e: FormEvent<HTMLInputElement>) {
    VALUE_ENTERED = true;
    setFilter(e.currentTarget.value);
  }

  useEffect(() => {
    const newQueryString = createQueryString('filter', debouncedFilter);
    // TODO is there a better way to handle it?
    if (!VALUE_ENTERED) {
      return;
    }

    router.replace(pathname + '?' + newQueryString);
  }, [debouncedFilter, router, createQueryString, pathname]);

  return (
    <div>
      <Input
        type="search"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Any manga that you fancy right now?"
      ></Input>
    </div>
  );
}
