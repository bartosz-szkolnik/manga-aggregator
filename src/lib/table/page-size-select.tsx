'use client';

import { PageSizeSelect } from '@components/table';
import { FormControl, Label } from '@components/ui/form';
import { updateSearchParamsShallowly } from '@utils/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function TablePageSizeSelect({ size, setSizeParam = true }: { size: number; setSizeParam?: boolean }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!setSizeParam) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (!params.has('size')) {
      params.set('size', '10');
    }

    updateSearchParamsShallowly(params);
  }, [searchParams, setSizeParam]);

  return (
    <FormControl className="w-[100px]" controlName="page-size">
      <Label>Page size</Label>
      <PageSizeSelect size={String(size)} />
    </FormControl>
  );
}
