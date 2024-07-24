import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { AllMangaPagination } from './table/all-manga-pagination';
import { AllMangaTable } from './table/all-manga-table';
import { getPage, getPagination, getSize } from './table/pagination-utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Manga · Manga Aggregator',
};

export default async function AllManga({ searchParams }: { searchParams: { page: string; size: string } }) {
  const { supabase, userId } = await createServerClient();
  const { count } = await supabase.from('manga').select('*', { count: 'exact' });

  // const size = getSize(searchParams.size);
  // const amountOfPages = Math.ceil((count ?? 0) / size);
  // const page = getPage(searchParams.page, amountOfPages);

  // const { from, to } = getPagination(page, size);
  // const { data, error } = await getData({ supabase, count, from, to });
  // if (error) {
  //   return <p>Some kind of error occured</p>;
  // }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">All Available Manga</h2>
          <p className="text-sm text-muted-foreground">Here&apos;s a list of all available manga.</p>
        </div>
      </div>
      {/* <AllMangaTable mangas={data} supabase={supabase} userId={userId} />
      <AllMangaPagination amountOfPages={amountOfPages} page={page} /> */}
    </>
  );
}

async function getData({
  count,
  from,
  supabase,
  to,
}: {
  supabase: SupabaseServerClient;
  count: number | null;
  from: number;
  to: number;
}) {
  return count === 0
    ? { data: [], error: null }
    : await supabase.from('manga').select('*').order('id', { ascending: true }).range(from, to);
}
