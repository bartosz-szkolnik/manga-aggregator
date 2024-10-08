import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/table';
import { mangaStatusToFormatted } from '@lib/change-manga-status';
import { EditMangaAttributesDialog } from '@lib/edit-manga-attributes';
import { Manga } from '@lib/manga';
import { RemoveMangaFromDatabaseButton } from '@lib/remove-manga-from-database';
import { Manga as MangaType } from '@lib/types/manga.types';

type AdminDashboardMangaTableProps = {
  mangas: MangaType[];
};

export function AdminDashboardMangaTable({ mangas }: AdminDashboardMangaTableProps) {
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
        {mangas.map(async manga => (
          <Row key={manga.id} manga={manga} />
        ))}
      </TableBody>
    </Table>
  );
}

type RowProps = {
  manga: MangaType;
};

async function Row({ manga }: RowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{manga.title}</TableCell>
      <TableCell>{mangaStatusToFormatted[manga.manga_status ?? 'unknown']}</TableCell>
      <TableCell className="flex flex-row-reverse gap-4">
        <Manga manga={manga} trigger="admin-button" />
        <RemoveMangaFromDatabaseButton mangaId={manga.id} smallButton />
        <EditMangaAttributesDialog data={manga} smallButton />
      </TableCell>
    </TableRow>
  );
}
