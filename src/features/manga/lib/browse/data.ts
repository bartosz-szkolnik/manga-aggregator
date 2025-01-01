import { unauthorized } from '@auth/utils';
import { createServerClient } from '@utils/supabase/server';
import { getAmountOfPages, getPage, getPagination, getSize, PaginationParams } from '@utils/pagination';
import { propertiesToCamelCase, mapArrayToCamelCase } from '@utils/utils';
import { CombinedManga, CombinedUnCamelCasedManga, MangaGridResponse, MangaTableResponse } from '../types';

export async function fetchMangasToBrowseToGrid(filter: string, offset = 0) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error, count } = await supabase
    .from('manga')
    .select(
      '*, profile_manga!inner(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)',
      { count: 'exact' },
    )
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true })
    .range(offset, offset + 9);

  if (error) {
    return { error };
  }

  return {
    data: mapData(data),
    total: count ?? 0,
    offset,
  } satisfies MangaGridResponse;
}

export async function fetchAllMangasToBrowseToTable({ count, filter, size, page }: PaginationParams) {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  if (count === 0) {
    return { data: [], size: 10, page: 1, amountOfPages: 0 } satisfies MangaTableResponse;
  }

  const calculatedSize = getSize(size);
  const amountOfPages = getAmountOfPages(count, calculatedSize);
  const calculatedPage = getPage(page, amountOfPages);
  const { from, to } = getPagination(calculatedPage, calculatedSize);

  const { data, error } = await supabase
    .from('manga')
    .select(
      '*, profile_manga!inner(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)',
    )
    .eq('profile_manga.profile_id', userId)
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true })
    .range(from, to);

  if (error) {
    return { error };
  }

  return {
    data: mapData(data),
    size: calculatedSize,
    page: calculatedSize,
    amountOfPages,
  } satisfies MangaTableResponse;
}

export async function fetchMangasToBrowseCount(filter?: string) {
  const { supabase, userId, profile } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count, error } = await supabase
    .from('manga')
    .select('', { count: 'exact' })
    .ilike('title', `%${filter ?? ''}%`);

  if (error) {
    return { error };
  }

  return { count, profile: propertiesToCamelCase(profile) };
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => {
    if (profileManga) {
      return { ...rest, ...propertiesToCamelCase(profileManga), hasProfileManga: true };
    }

    return { ...rest, hasProfileManga: false };
  });
}
