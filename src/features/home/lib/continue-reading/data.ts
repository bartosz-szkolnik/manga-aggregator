import { createServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase, propertiesToCamelCase } from '@utils/utils';
import { CombinedManga, CombinedUnCamelCasedManga } from '@manga/lib/types';
import { MangaScrollAreaResponse } from '@home/lib/types';
import { unauthorized } from '@auth/utils';

export async function fetchContinueReadingMangas() {
  const { supabase, userId } = await createServerClient();

  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase
    .from('manga')
    .select(
      '*, profile_manga!inner(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)',
    )
    .eq('profile_manga.profile_id', userId)
    .eq('profile_manga.is_in_library', true)
    .eq('profile_manga.reading_status', 'reading')
    // TODO: Add a proper orderBy when the updatedAt is present
    .order('id', { ascending: true })
    .range(0, 9);

  if (error) {
    return { error };
  }

  return { data: mapData(data) } satisfies MangaScrollAreaResponse;
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => {
    return { ...rest, ...propertiesToCamelCase(profileManga), hasProfileManga: true };
  });
}
