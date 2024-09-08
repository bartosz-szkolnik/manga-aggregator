'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/form';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@utils/hooks/debounce';

const DELAY_300MS = 300;

export function FilterInput() {
  const searchParams = useSearchParams();
  const [, value] = searchParams.toString().split(`filter=`);

  const pathname = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState(value ?? '');
  const debouncedFilter = useDebounce(filter, DELAY_300MS);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const oldFilter = params.get('filter');
      if (oldFilter !== value) {
        params.set('page', '1');
      }
      params.set('size', params.get('size') ?? '10');
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function handleFilterChange(e: FormEvent<HTMLInputElement>) {
    setFilter(e.currentTarget.value);
  }

  useEffect(() => {
    router.replace(pathname + '?' + createQueryString('filter', debouncedFilter));
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
