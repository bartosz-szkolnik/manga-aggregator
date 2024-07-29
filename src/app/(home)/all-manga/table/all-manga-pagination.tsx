import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from '@components/ui/pagination';

type AllMangaPagination = {
  page: number;
  amountOfPages: number;
  filter: string;
};

export function AllMangaPagination({ page, amountOfPages, filter }: AllMangaPagination) {
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
          <PaginationFirst disabled={firstDisabled} replace href={{ query: { page: 1, filter } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious disabled={previousDisabled} replace href={{ query: { page: page - 1, filter } }} />
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
                href={{ query: { page: pageOrEllipsis, filter } }}
              >
                {pageOrEllipsis}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext disabled={nextDisabled} replace href={{ query: { page: page + 1, filter } }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast disabled={lastDisabled} replace href={{ query: { page: amountOfPages + 1, filter } }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function generatePages(page: number, amountOfPages: number) {
  const boundaryCount = 1;
  const siblingCount = 1;

  const startPages = range(1, Math.min(boundaryCount, amountOfPages));
  const endPages = range(Math.max(amountOfPages - boundaryCount + 1, boundaryCount + 1), amountOfPages);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, amountOfPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : amountOfPages - 1,
  );

  const ellipsis = 'ellipsis' as const;
  const itemList = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? [ellipsis]
      : boundaryCount + 1 < amountOfPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < amountOfPages - boundaryCount - 1
      ? [ellipsis]
      : amountOfPages - boundaryCount > boundaryCount
        ? [amountOfPages - boundaryCount]
        : []),
    ...endPages,
  ];

  return itemList;
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}
