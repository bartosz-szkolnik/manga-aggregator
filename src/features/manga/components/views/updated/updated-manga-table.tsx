import { logger } from '@utils/server/logger';
import { fetchUpdatedMangasToTable } from '@manga/lib/updated/data';
import { TablePaginationContrainer } from '@lib/table';
import { MangaTable } from '@manga/components/table';

type UpdatedMangaTableProps = {
  filter: string;
  count: number;
  size: string | undefined;
  page: string | undefined;
};

export async function UpdatedMangaTable(props: UpdatedMangaTableProps) {
  const { filter } = props;
  const { error, data, size, page, amountOfPages } = await fetchUpdatedMangasToTable({ ...props });

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
