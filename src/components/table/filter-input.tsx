'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/form';
import { FormEvent, useState } from 'react';
import { useDebounce } from '@utils/hooks';

export function FilterInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('filter') ?? '');
  const debounced = useDebounce((newQueryString: URLSearchParams) => router.replace(`${pathname}?${newQueryString}`));

  function handleFilterChange(e: FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);

    const params = new URLSearchParams(searchParams);
    const newQueryString = assignSearchParams(params, e.currentTarget.value);
    debounced(newQueryString);
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

  return params;
}
