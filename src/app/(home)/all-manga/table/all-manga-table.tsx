import { Badge } from '@components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Manga } from '@lib/manga/manga';
import { SupabaseServerClient } from '@utils/supabase/server';
import { Manga as MangaType } from '@lib/types/manga.types';

type AllMangaTableProps = {
  mangas: MangaType[];
  userId?: string;
  supabase: SupabaseServerClient;
};

export function AllMangaTable({ mangas, supabase, userId }: AllMangaTableProps) {
  return (
    <Table className="my-8">
      <TableCaption>All your favorite manga in one place.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Latest chapter</TableHead>
          <TableHead>How far you are</TableHead>
          <TableHead>Reading status</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mangas.map(async manga => (
          <Row key={manga.id} supabase={supabase} manga={manga} userId={userId} />
        ))}
      </TableBody>
    </Table>
  );
}

type RowProps = {
  supabase: SupabaseServerClient;
  manga: MangaType;
  userId?: string;
};

async function Row({ supabase, manga, userId }: RowProps) {
  const { data, error } = await supabase
    .from('profile_manga')
    .select('*')
    .match({ profile_id: userId, manga_id: manga.id })
    .single();

  if (error) {
    console.error(error);
    return (
      <TableRow>
        <TableCell>Some error happened and we can&apos;t display this manga right now.</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{manga.title}</TableCell>
      <TableCell>{manga.manga_status}</TableCell>
      <TableCell>{manga.latest_chapter}</TableCell>
      <TableCell>{data.latest_chapter_read}</TableCell>
      <TableCell>{data.reading_status}</TableCell>
      <TableCell className="text-right">
        <div className="flex flex-row-reverse gap-4">
          <Manga manga={manga} buttonAsTrigger={true} />
          {data.is_in_library && (
            <Badge variant="outline" className="border-blue-600 text-blue-600">
              In Library
            </Badge>
          )}
          {data.is_following && (
            <Badge variant="outline" className="border-green-600 text-green-600">
              Following
            </Badge>
          )}
          {data.is_favorite && (
            <Badge variant="outline" className="border-red-600 text-red-600">
              Favorite
            </Badge>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}