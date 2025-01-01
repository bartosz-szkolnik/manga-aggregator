import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/table';
import { EditMangaAttributesDialog } from '@admin-dashboard/components/edit-manga-attributes';
import { RemoveMangaFromDatabaseButton } from '@admin-dashboard/components/remove-manga-from-database';
import { AdminDashboardMangaTableSheet } from './dashboard-manga-table-sheet';
import { MangaTableResponse } from '@manga/lib/types';
import { formatMangaStatus } from '@manga/utils';

type RowManga = MangaTableResponse['data'];
type AdminDashboardMangaTableProps = {
  data: RowManga;
};

export function AdminDashboardMangaTable({ data }: AdminDashboardMangaTableProps) {
  return (
    <Table className="my-8">
      <TableCaption>All the Manga in this app is available in this place.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(async manga => (
          <AdminDashboardMangaTableRow key={manga.id} manga={manga} />
        ))}
      </TableBody>
    </Table>
  );
}

type AdminDashboardMangaTableRowProps = {
  manga: RowManga[number];
};

async function AdminDashboardMangaTableRow({ manga }: AdminDashboardMangaTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{manga.title}</TableCell>
      <TableCell>{formatMangaStatus(manga.mangaStatus)}</TableCell>
      <TableCell className="flex flex-row-reverse gap-4">
        <AdminDashboardMangaTableSheet manga={manga} />
        <RemoveMangaFromDatabaseButton mangaId={manga.id} smallButton />
        <EditMangaAttributesDialog data={manga} smallButton />
      </TableCell>
    </TableRow>
  );
}
