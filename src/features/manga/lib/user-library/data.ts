import { unauthorized } from '@auth/utils';
import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase, propertiesToCamelCase } from '@utils/utils';
import { getAmountOfPages, getPage, getPagination, getSize, PaginationParams } from '@utils/pagination';
import { CombinedManga, CombinedUnCamelCasedManga, MangaGridResponse, MangaTableResponse } from '../types';
import { Profile } from '@manga/types';

export async function fetchMangasFromUserLibraryToGrid(filter: string, total: number, offset = 0, howMany = 10) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await makeRequest(supabase, filter, userId).range(offset, offset + howMany - 1);
  if (error) {
    return { error };
  }

  return { data: mapData(data), total, offset } satisfies MangaGridResponse;
}

export async function fetchMangasFromUserLibraryToTable({ count, filter, size, page }: PaginationParams) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  if (count === 0) {
    return { data: [], size: getSize(size), page: 1, amountOfPages: 0 } satisfies MangaTableResponse;
  }

  const calculatedSize = getSize(size);
  const amountOfPages = getAmountOfPages(count, calculatedSize);
  const calculatedPage = getPage(page, amountOfPages);
  const { from, to } = getPagination(calculatedPage, calculatedSize);

  const { data, error } = await makeRequest(supabase, filter, userId).range(from, to);
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

export async function fetchMangasFromUserLibraryCount(filter?: string) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count, error } = await supabase
    .from('manga')
    .select('profile_manga!inner()', { count: 'exact' })
    .eq('profile_manga.profile_id', userId)
    .eq('profile_manga.is_in_library', true)
    .ilike('title', `%${filter ?? ''}%`);

  if (error) {
    return { error };
  }

  return { count };
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => ({
    ...rest,
    ...propertiesToCamelCase(profileManga),
    hasProfileManga: true,
  }));
}

function makeRequest(supabase: SupabaseServerClient, filter: string, userId: Profile['id']) {
  return supabase
    .from('manga')
    .select(
      '*, profile_manga!inner(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)',
      { count: 'exact' },
    )
    .eq('profile_manga.profile_id', userId)
    .eq('profile_manga.is_in_library', true)
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true });
}
