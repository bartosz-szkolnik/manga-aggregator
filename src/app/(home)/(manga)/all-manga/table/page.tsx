import { TablePageSizeSelect, TablePagination } from '@lib/table';
import { AllMangaTable } from './all-manga-table';
import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { getPage, getPagination, getSize } from '@utils/pagination';
import { logger } from '@utils/server/logger';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Manga Table · Manga Aggregator',
};

type AllMangaTableProps = {
  searchParams: { page: string; size: string; filter: string };
};

export default async function AllMangaTablePage({ searchParams }: AllMangaTableProps) {
  const { supabase, userId } = await createServerClient();
  const filter = searchParams.filter ?? '';
  const count = await getCount(supabase, filter);

  const size = getSize(searchParams.size);
  const amountOfPages = Math.ceil((count ?? 0) / size);
  const page = getPage(searchParams.page, amountOfPages);

  const { from, to } = getPagination(page, size);
  const { data, error } = await getData({ supabase, count, from, to, filter });
  if (error) {
    logger.error(error.message);
    return <p>Some kind of error occured</p>;
  }

  return (
    <div>
      <AllMangaTable mangas={data} supabase={supabase} userId={userId} />
      <div className="flex justify-end">
        <TablePagination amountOfPages={amountOfPages} page={page} filter={filter} size={size} />
        <TablePageSizeSelect size={size} />
      </div>
    </div>
  );
}

async function getCount(supabase: SupabaseServerClient, filter: string) {
  const { count } = await supabase.from('manga').select('*', { count: 'exact' }).ilike('title', `%${filter}%`);
  return count;
}

type GetDataParams = {
  supabase: SupabaseServerClient;
  count: number | null;
  from: number;
  to: number;
  filter: string;
};
async function getData({ count, from, supabase, to, filter }: GetDataParams) {
  if (count === 0) {
    return { data: [], error: null };
  }

  return await supabase
    .from('manga')
    .select('*')
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true })
    .range(from, to);
}
