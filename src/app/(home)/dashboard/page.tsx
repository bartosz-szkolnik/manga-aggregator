import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { Metadata } from 'next';
import { isAdmin, unauthorized } from '@utils/utils';
import { logger } from '@utils/server/logger';
import { TablePageSizeSelect, TablePagination, TitleFilter } from '@lib/table';
import { AdminDashboardMangaTable } from './dashboard-manga-table';
import { getSize, getPage, getPagination } from '@utils/pagination';

export const metadata: Metadata = {
  title: 'Admin Dashboard · Manga Aggregator',
};

type AdminDashboardProps = {
  searchParams: { page: string; size: string; filter: string };
};

export default async function AdminDashboardPage({ searchParams }: AdminDashboardProps) {
  const { supabase } = await createServerClient();
  {
    // prettier-ignore
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user || !isAdmin(user.email)) {
      if (error) {
        logger.error(error);
      }
      return unauthorized();
    }
  }

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
    <div className="px-4 py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Here you can do everything.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <TitleFilter />
      </div>
      <AdminDashboardMangaTable mangas={data} />
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
