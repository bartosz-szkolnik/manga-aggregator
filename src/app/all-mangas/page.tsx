import { Metadata } from 'next';
import { DataTable } from './components/data-table';
import { columns } from './components/data-table/columns';
import { createServerClient } from '@/src/utils/supabase';
import { MangaEmptyPlaceholder } from '@/src/components/shared/manga-empty-placeholder';

export const metadata: Metadata = {
  title: 'All Mangas',
  description: 'Browse all available mangas and add them to your library.',
};

export default async function AllMangasPage() {
  const { supabase, id = '' } = await createServerClient();
  const { data: mangaData } = await supabase.from('manga').select('title, id, is_completed, latest_chapter_no');
  const { data: profileMangaData } = await supabase.from('profile_manga').select('*').eq('profile_id', id);

  if (!mangaData || !profileMangaData) {
    return <MangaEmptyPlaceholder></MangaEmptyPlaceholder>;
  }

  const data = mangaData.map(manga => {
    const found = profileMangaData.find(p => p.manga_id === manga.id);
    if (!found) {
      return manga;
    }

    return { ...manga, ...found } as const;
  });

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
        <DataTable columns={columns} data={data}></DataTable>
      </div>
    </>
  );
}
