import { Manga } from '@manga/types';
import { unauthorized } from '@auth/utils';
import { getAmountOfPages, getPage, getPagination, getSize, PaginationParams } from '@utils/pagination';
import { createServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase, propertiesToCamelCase } from '@utils/utils';
import { CombinedManga, CombinedUnCamelCasedManga, MangaGridResponse, MangaTableResponse } from '../types';

export async function fetchReadingNowMangasToGrid(filter: string, offset = 0) {
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
    .eq('profile_manga.profile_id', userId)
    .eq('profile_manga.is_in_library', true)
    .eq('profile_manga.reading_status', 'reading')
    .ilike('title', `%${filter}%`)
    .order('id', { ascending: true })
    .range(offset, offset + 9);

  if (error) {
    return { error };
  }

  // TODO:
  // const mangas = data
  //   .filter(({ latest_chapter_read, manga }) => !isUpToDate({ latest_chapter_read, manga }))
  //   .toSorted(sort)
  //   .flatMap(({ manga }) => (manga ? [manga] : []));

  return { data: mapData(data), total: count ?? 0, offset } satisfies MangaGridResponse;
}

export async function fetchReadingNowMangasToTable({ count, filter, size, page }: PaginationParams) {
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
    .eq('profile_manga.is_in_library', true)
    .eq('profile_manga.reading_status', 'reading')
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

export async function fetchReadingNowMangasCount(filter?: string) {
  const { supabase, userId, profile } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { error, count } = await supabase
    .from('manga')
    .select('profile_manga!inner()', { count: 'exact' })
    .eq('profile_manga.profile_id', userId)
    .eq('profile_manga.is_in_library', true)
    .eq('profile_manga.reading_status', 'reading')
    .ilike('title', `%${filter ?? ''}%`);

  if (error) {
    return { error };
  }

  return { count, profile };
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => ({
    ...rest,
    ...propertiesToCamelCase(profileManga),
    hasProfileManga: true,
  }));
}

// TODO: What did I want to achieve with this?
type Sortable = { latestChapterRead: string | null; manga: Manga | null };
function sort(left: Sortable, right: Sortable) {
  const isLeftUpToDate = isUpToDate(left);
  const isRightUpToDate = isUpToDate(right);

  if (isLeftUpToDate && isRightUpToDate) {
    return 0;
  }

  if (isLeftUpToDate) {
    return 1;
  }

  if (isRightUpToDate) {
    return -1;
  }

  return 0;
}

function isUpToDate({ latestChapterRead = '0', manga }: Sortable) {
  const _latestChapterRead = Number(latestChapterRead) ?? 0;
  const latestChapter = Number(manga?.latestChapter) ?? 0;
  return _latestChapterRead >= latestChapter;
}
