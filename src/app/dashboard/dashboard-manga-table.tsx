import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/table';
import { Manga } from '@lib/manga';
import { MangaStatus, Manga as MangaType } from '@lib/types/manga.types';

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
      <TableCell>{statusTranslations[manga.manga_status ?? 'unknown']}</TableCell>
      <TableCell className="flex flex-row-reverse">
        <Manga manga={manga} trigger="admin-button" />
      </TableCell>
    </TableRow>
  );
}

const statusTranslations = {
  cancelled: 'Cancelled',
  completed: 'Completed',
  hiatus: 'Hiatus',
  ongoing: 'Ongoing',
  unknown: 'Unknown',
} satisfies Record<MangaStatus, string>;