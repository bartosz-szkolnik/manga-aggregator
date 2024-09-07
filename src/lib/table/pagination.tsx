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

type TablePaginationProps = {
  page: number;
  amountOfPages: number;
  filter: string;
  size: number;
};

export function TablePagination({ page, amountOfPages, filter, size }: TablePaginationProps) {
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
          <PaginationFirst disabled={firstDisabled} replace href={{ query: { page: 1, size, filter } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious disabled={previousDisabled} replace href={{ query: { page: page - 1, size, filter } }} />
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
                href={{ query: { page: pageOrEllipsis, size, filter } }}
              >
                {pageOrEllipsis}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext disabled={nextDisabled} replace href={{ query: { page: page + 1, size, filter } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast disabled={lastDisabled} replace href={{ query: { page: amountOfPages + 1, size, filter } }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
