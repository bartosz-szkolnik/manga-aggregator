import { MangaTableResponse } from '@manga/lib/types';
import { unauthorized } from '@auth/utils';
import { getAmountOfPages, getPage, getPagination, getSize } from '@utils/pagination';
import { createServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase } from '@utils/utils';

type GetDataParams = {
  filter: string;
  size: string | undefined;
  page: string | undefined;
};

export async function fetchMangasForAdminDashboard({ filter, page, size }: GetDataParams) {
  const { supabase, user, profile } = await createServerClient();
  if (!user || profile?.role !== 'admin') {
    return unauthorized();
  }

  const { count } = await supabase
    .from('manga')
    .select('*', { count: 'exact' })
    .ilike('title', `%${filter ?? ''}%`);

  const calculatedSize = getSize(size);
  const amountOfPages = getAmountOfPages(count ?? 0, calculatedSize);
  const calculatedPage = getPage(page, amountOfPages);
  const { from, to } = getPagination(calculatedPage, calculatedSize);

  if (count === 0) {
    return { data: [], size: 10, amountOfPages: 0, page: 1, count } satisfies MangaTableResponse & { count: number };
  }

  const { data, error } = await supabase
    .from('manga')
    .select('*')
    .ilike('title', `%${filter ?? ''}%`)
    .order('id', { ascending: true })
    .range(from, to);

  if (error) {
    return { error };
  }

  return {
    data: mapArrayToCamelCase(data).map(p => ({ ...p, hasProfileManga: false })),
    size: calculatedSize,
    page: calculatedPage,
    amountOfPages,
    count: count ?? 0,
  } satisfies MangaTableResponse & { count: number };
}
