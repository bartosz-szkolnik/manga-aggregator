import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { AllMangaPagination } from './table/all-manga-pagination';
import { AllMangaTable } from './table/all-manga-table';
import { Metadata } from 'next';
import { clamp } from '@utils/utils';
import { logger } from '@utils/server/logger';
import { FilterInput } from '@components/ui/filter-input';
import { FormControl, Label } from '@components/ui/form';

export const metadata: Metadata = {
  title: 'All Manga · Manga Aggregator',
};

type AllMangaProps = {
  searchParams: { page: string; size: string; filter: string };
};

export default async function AllManga({ searchParams }: AllMangaProps) {
  const { supabase, userId } = await createServerClient();
  const filter = searchParams.filter ?? '';
  const { count } = await supabase.from('manga').select('*', { count: 'exact' }).ilike('title', `%${filter}%`);

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
    <>
      <div className="mt-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">All Available Manga</h2>
          <p className="text-sm text-muted-foreground">Here&apos;s a list of all available manga.</p>
        </div>
        <FormControl className="w-[500px]" controlName="filter">
          <Label>Filter results by title</Label>
          <FilterInput />
        </FormControl>
      </div>
      <AllMangaTable mangas={data} supabase={supabase} userId={userId} />
      <AllMangaPagination amountOfPages={amountOfPages} page={page} filter={filter} />
    </>
  );
}

async function getData({
  count,
  from,
  supabase,
  to,
  filter,
}: {
  supabase: SupabaseServerClient;
  count: number | null;
  from: number;
  to: number;
  filter: string;
}) {
  return count === 0
    ? { data: [], error: null }
    : await supabase
        .from('manga')
        .select('*')
        .ilike('title', `%${filter}%`)
        .order('id', { ascending: true })
        .range(from, to);
}

function getSize(size: string) {
  const value = Number(size) || 10;
  return clamp(value, 5, 50);
}

function getPage(page: string, amountOfPages: number) {
  const value = Number(page) || 1;
  return clamp(value, 1, amountOfPages);
}

function getPagination(page: number, size: number) {
  const from = (page - 1) * size;
  const to = from + size - 1;

  return { from, to };
}
