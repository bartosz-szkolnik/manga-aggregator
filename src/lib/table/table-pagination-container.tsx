'use client';

import { useSearchParams } from 'next/navigation';
import { TablePageSizeSelect } from './page-size-select';
import { TablePagination } from './pagination';
import { useEffect } from 'react';
import { updateSearchParamsShallowly } from '@utils/utils';

type TablePaginationContrainerProps = {
  size: number;
  amountOfPages: number;
  page: number;
  filter: string;
};

export function TablePaginationContrainer({ size, ...props }: TablePaginationContrainerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('size')) {
      params.set('size', '10');
    }
    if (!params.has('page')) {
      params.set('page', '1');
    }

    updateSearchParamsShallowly(params);
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-end gap-4 md:flex-row">
      <TablePagination {...props} size={size} tab="table" setPageParam={false} />
      <TablePageSizeSelect size={size} setSizeParam={false} />
    </div>
  );
}
