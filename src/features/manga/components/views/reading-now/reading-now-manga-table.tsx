import { logger } from '@utils/server/logger';
import { fetchReadingNowMangasToTable } from '@manga/lib/reading-now/data';
import { TablePageSizeSelect, TablePagination } from '@lib/table';
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
      <div className="flex flex-col justify-end gap-4 md:flex-row">
        <TablePagination amountOfPages={amountOfPages} page={page} filter={filter} size={size} />
        <TablePageSizeSelect size={size} />
      </div>
    </>
  );
}
