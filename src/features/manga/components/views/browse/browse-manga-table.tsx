import { MangaTable } from '@manga/components/table';
import { fetchAllMangasToBrowseToTable } from '@manga/lib/browse/data';
import { TablePaginationContrainer } from '@lib/table';
import { ServerError } from '@components/common/error/error.server';

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
    return <ServerError error={error} />;
  }

  return (
    <>
      <MangaTable data={data} />
      <TablePaginationContrainer amountOfPages={amountOfPages} filter={filter} page={page} size={size} />
    </>
  );
}
