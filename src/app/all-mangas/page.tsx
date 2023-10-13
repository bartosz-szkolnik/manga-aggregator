import { Metadata } from 'next';
import { DataTable } from '../../components/shared/data-table/data-table';
import { columns } from './components/data-table/columns';
import { createServerClient } from '@/src/utils/supabase';
import { MangaEmptyPlaceholder } from '@/src/components/shared/manga-empty-placeholder';
import { DataTableToolbar } from './components/data-table/data-table-toolbar';

export const metadata: Metadata = {
  title: 'All Mangas',
  description: 'Browse all available mangas and add them to your library.',
};

export default async function AllMangasPage() {
  const data = await getMangaData();
  if (!data) {
    return <MangaEmptyPlaceholder></MangaEmptyPlaceholder>;
  }

  return (
    <>
      <div className="md:hidden">Not yet implemented</div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex w-full">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Mangas!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of all of your favorite mangas at your disposal!</p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable columns={columns} data={data} toolbar={DataTableToolbar}></DataTable>
      </div>
    </>
  );
}

async function getMangaData() {
  const { supabase, id = '' } = await createServerClient();

  const [manga, profileManga] = await Promise.all([
    // supabase.from('manga').select('title, id, isCompleted:is_completed, latestChapterNo:latest_chapter_no'),
    supabase.from('manga').select('title, id, is_completed, latest_chapter_no'),
    supabase.from('profile_manga').select('*').eq('profile_id', id),
  ]);

  if (!manga || !profileManga) {
    return null;
  }

  const data = manga.data?.map(m => {
    const found = profileManga.data?.find(p => p.manga_id === m.id);
    if (!found) {
      return m;
    }

    return { ...m, ...found } as const;
  });

  return data;
}
