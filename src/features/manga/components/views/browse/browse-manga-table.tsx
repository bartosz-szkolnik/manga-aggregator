import { MangaTable } from '@manga/components/table';
import { fetchAllMangasToBrowseToTable } from '@manga/lib/browse/data';
import { logger } from '@utils/server/logger';
import { TablePaginationContrainer } from '@lib/table';

type BrowseMangaTableProps = {
  filter: string;
  count: number;
  size: string | undefined;
  page: string | undefined;
};

export async function BrowseMangaTable(props: BrowseMangaTableProps) {
  const { filter } = props;
  const { error, data, amountOfPages, page, size } = await fetchAllMangasToBrowseToTable({ ...props });

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <>
      <MangaTable data={data} />
      <TablePaginationContrainer amountOfPages={amountOfPages} filter={filter} page={page} size={size} />
    </>
  );
}
