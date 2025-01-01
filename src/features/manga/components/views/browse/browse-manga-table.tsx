import { MangaTable } from '@manga/components/table';
import { fetchAllMangasToBrowseToTable } from '@manga/lib/browse/data';
import { logger } from '@utils/server/logger';
import { TablePageSizeSelect, TablePagination } from '@lib/table';

type BrowseMangaTableProps = {
  filter: string;
  count: number;
  size: string | undefined;
  page: string | undefined;
};

export async function BrowseMangaTable(props: BrowseMangaTableProps) {
  const { filter } = props;
  const { error, data, size, page, amountOfPages } = await fetchAllMangasToBrowseToTable({ ...props });

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <>
      <MangaTable data={data} />
      <div className="flex flex-col justify-end gap-4 md:flex-row">
        <TablePagination amountOfPages={amountOfPages} page={page} filter={filter} size={size} />
        <TablePageSizeSelect size={size} />
      </div>
    </>
  );
}
