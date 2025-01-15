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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type TablePaginationProps = {
  page: number;
  amountOfPages: number;
  filter: string;
  size: number;
  tab: string;
};

export function TablePagination({ page, amountOfPages, ...props }: TablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('page')) {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params}`);
  }, [pathname, router, searchParams]);

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
