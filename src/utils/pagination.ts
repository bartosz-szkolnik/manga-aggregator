import { clamp } from './utils';

export type PaginationParams = {
  count: number;
  size: string | undefined;
  page: string | undefined;
  filter: string;
};

export type LazyTableTabProps = {
  tab: string;
  filter: string;
  size: string;
  page: string;
  count: number;
};

export function getSize(size?: string) {
  const value = Number(size) || 10;
  return clamp(value, 5, 50);
}

export function getAmountOfPages(count: number, size: number) {
  return Math.ceil((count ?? 0) / size);
}

export function getPage(page: string | undefined, amountOfPages: number) {
  const value = Number(page) || 1;
  return clamp(value, 1, amountOfPages);
}

export function getPagination(page: number, size: number) {
  const from = (page - 1) * size;
  const to = from + size - 1;

  return { from, to };
}

export function generatePages(page: number, amountOfPages: number) {
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
