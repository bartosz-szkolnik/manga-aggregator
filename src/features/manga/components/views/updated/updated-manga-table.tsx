import { fetchUpdatedMangasToTable } from '@manga/lib/updated/data';
import { TablePaginationContrainer } from '@lib/table';
import { MangaTable } from '@manga/components/table';
import { ServerError } from '@components/common/error/error.server';

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
    return <ServerError error={error} />;
  }

  return (
    <>
      <MangaTable data={data} />
      <TablePaginationContrainer amountOfPages={amountOfPages} filter={filter} page={page} size={size} />
    </>
  );
}
