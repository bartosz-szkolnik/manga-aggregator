'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationLast,
} from '@components/table/pagination';
import { generatePages } from '@utils/pagination';
import { updateSearchParamsShallowly } from '@utils/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type TablePaginationProps = {
  page: number;
  amountOfPages: number;
  filter: string;
  size: number;
  tab: string;
  setPageParam?: boolean;
};

export function TablePagination({ page, amountOfPages, setPageParam = true, ...props }: TablePaginationProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!setPageParam) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
      params.set('page', '1');
    }

    updateSearchParamsShallowly(params);
  }, [searchParams, setPageParam]);

  const pages = amountOfPages > 1 ? generatePages(page, amountOfPages) : [];
  if (amountOfPages < 2) {
    return null;
  }

  const previousDisabled = page - 1 < 1;
  const nextDisabled = page + 1 > amountOfPages;
  const firstDisabled = page === 1;
  const lastDisabled = page === amountOfPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst disabled={firstDisabled} replace href={{ query: { ...props, page: 1 } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious disabled={previousDisabled} replace href={{ query: { ...props, page: page - 1 } }} />
        </PaginationItem>
        {pages.map((pageOrEllipsis, index) => {
          if (pageOrEllipsis === 'ellipsis') {
            return (
              <div key={`${pageOrEllipsis}:${index}`} className="px-2 pt-3">
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </div>
            );
          }

          return (
            <PaginationItem key={`${pageOrEllipsis}:${index}`}>
              <PaginationLink
                isActive={page === pageOrEllipsis}
                replace
                href={{ query: { ...props, page: pageOrEllipsis } }}
              >
                {pageOrEllipsis}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext disabled={nextDisabled} replace href={{ query: { ...props, page: page + 1 } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast disabled={lastDisabled} replace href={{ query: { ...props, page: amountOfPages } }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
