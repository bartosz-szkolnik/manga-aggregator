import { Badge } from '@components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/table';
import { MangaTableSheet } from './manga-table-sheet';
import { MangaTableResponse } from '@manga/lib/types';
import { formatMangaStatus, formatReadingStatus } from '@manga/utils';

type RowManga = MangaTableResponse['data'];
type MangaTableProps = {
  data: RowManga;
};

export function MangaTable({ data }: MangaTableProps) {
  return (
    <Table className="my-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px] min-w-[300px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Latest chapter</TableHead>
          <TableHead className="min-w-[100px]">How far you are</TableHead>
          <TableHead>Reading status</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(async manga => (
          <MangaTableRow key={manga.id} manga={manga} />
        ))}
      </TableBody>
      <TableCaption>All your favorite manga in one place.</TableCaption>
    </Table>
  );
}

type MangaTableRowProps = {
  manga: RowManga[number];
};

async function MangaTableRow({ manga }: MangaTableRowProps) {
  const { title, mangaStatus, hasProfileManga, latestChapter } = manga;

  if (!hasProfileManga) {
    return (
      <TableRow>
        <TableCell className="font-medium">{title}</TableCell>
        <TableCell>{formatMangaStatus(mangaStatus)}</TableCell>
        <TableCell>{latestChapter}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell className="flex flex-row-reverse">
          <MangaTableSheet manga={manga} />
        </TableCell>
      </TableRow>
    );
  }

  const {
    latestChapterRead,
    readingStatus,
    isInLibrary: isInUserLibrary,
    isFavorite: isUserFavorite,
    isFollowing: isUserFollowing,
  } = manga;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{formatMangaStatus(mangaStatus)}</TableCell>
      <TableCell>{latestChapter}</TableCell>
      <TableCell>{latestChapterRead}</TableCell>
      <TableCell>{formatReadingStatus(readingStatus)}</TableCell>
      <TableCell className="text-right">
        <div className="flex flex-row-reverse gap-4">
          <MangaTableSheet manga={manga} />
          {isInUserLibrary && (
            <Badge variant="outline" className="whitespace-nowrap border-blue-600 text-blue-600">
              In Library
            </Badge>
          )}
          {isUserFollowing && (
            <Badge variant="outline" className="whitespace-nowrap border-green-600 text-green-600">
              Following
            </Badge>
          )}
          {isUserFavorite && (
            <Badge variant="outline" className="whitespace-nowrap border-red-600 text-red-600">
              Favorite
            </Badge>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
