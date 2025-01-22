import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { getAmountOfPages, getPage, getPagination, getSize, PaginationParams } from '@utils/pagination';
import { propertiesToCamelCase, mapArrayToCamelCase } from '@utils/utils';
import { CombinedManga, CombinedUnCamelCasedManga, MangaGridResponse, MangaTableResponse } from '../types';

export async function fetchMangasToBrowseToGrid(filter: string, total: number, offset = 0, howMany = 10) {
  const { supabase } = await createServerClient();
  const { data, error } = await makeRequest(supabase, filter).range(offset, offset + howMany - 1);
  if (error) {
    return { error };
  }

  return { data: mapData(data), total, offset } satisfies MangaGridResponse;
}

export async function fetchAllMangasToBrowseToTable({ count, filter, size, page }: PaginationParams) {
  const { supabase } = await createServerClient();

  if (count === 0) {
    return { data: [], size: getSize(size), page: 1, amountOfPages: 1 } satisfies MangaTableResponse;
  }

  const calculatedSize = getSize(size);
  const amountOfPages = getAmountOfPages(count, calculatedSize);
  const calculatedPage = getPage(page, amountOfPages);
  const { from, to } = getPagination(calculatedPage, calculatedSize);

  const { data, error } = await makeRequest(supabase, filter).range(from, to);
  if (error) {
    return { error };
  }

  return {
    data: mapData(data),
    size: calculatedSize,
    page: calculatedPage,
    amountOfPages,
  } satisfies MangaTableResponse;
}

export async function fetchMangasToBrowseCount(filter?: string) {
  const { supabase } = await createServerClient();

  const { count, error } = await supabase
    .from('manga')
    .select('', { count: 'exact' })
    .ilike('title', `%${filter ?? ''}%`);

  if (error) {
    return { error };
  }

  return { count };
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => {
    if (profileManga) {
      return { ...rest, ...propertiesToCamelCase(profileManga), hasProfileManga: true };
    }

    return { ...rest, hasProfileManga: false };
  });
}

function makeRequest(supabase: SupabaseServerClient, filter: string) {
  return supabase
    .from('manga')
    .select('*, profile_manga(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)')
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true });
}
