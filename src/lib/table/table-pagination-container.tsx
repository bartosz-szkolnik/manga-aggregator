'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TablePageSizeSelect } from './page-size-select';
import { TablePagination } from './pagination';
import { useEffect } from 'react';

type TablePaginationContrainerProps = {
  size: number;
  amountOfPages: number;
  page: number;
  filter: string;
};

export function TablePaginationContrainer({ size, amountOfPages, filter, page }: TablePaginationContrainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('size')) {
      params.set('size', '10');
    }
    if (!params.has('page')) {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="flex flex-col justify-end gap-4 md:flex-row">
      <TablePagination amountOfPages={amountOfPages} page={page} filter={filter} size={size} tab="table" />
      <TablePageSizeSelect size={size} />
    </div>
  );
}
