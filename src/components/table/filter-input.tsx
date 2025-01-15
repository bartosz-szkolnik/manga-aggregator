'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/form';
import { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from '@utils/hooks';

export function FilterInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('filter') ?? '');
  const debouncedFilter = useDebounce(value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newQueryString = assignSearchParams(params, debouncedFilter);
    router.replace(`${pathname}?${newQueryString}`);
  }, [debouncedFilter, router, pathname, searchParams]);

  function handleFilterChange(e: FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <Input
      type="search"
      value={value}
      onChange={handleFilterChange}
      placeholder="Any manga that you fancy right now?"
    />
  );
}

function assignSearchParams(params: URLSearchParams, value: string) {
  const oldValue = params.get('filter');
  const page = params.get('page');

  if (!value) {
    params.delete('filter');
  } else {
    params.set('filter', value);
  }

  if (page) {
    params.set('page', oldValue === value ? page : '1');
  }

  return params.toString();
}
