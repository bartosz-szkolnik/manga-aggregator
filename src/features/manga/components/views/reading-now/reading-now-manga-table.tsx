import { logger } from '@utils/server/logger';
import { fetchReadingNowMangasToTable } from '@manga/lib/reading-now/data';
import { TablePaginationContrainer } from '@lib/table';
import { MangaTable } from '@manga/components/table';

type ReadingNowMangaTableProps = {
  filter: string;
  count: number;
  size: string | undefined;
  page: string | undefined;
};

export async function ReadingNowMangaTable(props: ReadingNowMangaTableProps) {
  const { filter } = props;
  const { error, data, size, page, amountOfPages } = await fetchReadingNowMangasToTable({ ...props });

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
