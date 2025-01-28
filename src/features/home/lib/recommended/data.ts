import { createServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase, propertiesToCamelCase } from '@utils/utils';
import { CombinedManga, CombinedUnCamelCasedManga } from '@manga/lib/types';
import { MangaScrollAreaResponse } from '@home/lib/types';

export async function fetchRecommendedMangas(offset = 0) {
  const { supabase } = await createServerClient();

  const { data, error } = await supabase
    .from('manga')
    .select('*, profile_manga(latest_chapter_read, is_in_library, reading_status, priority, is_following, is_favorite)')
    .order('id', { ascending: true })
    .range(offset, offset + 9);

  if (error) {
    return { error };
  }

  return { data: mapData(data) } satisfies MangaScrollAreaResponse;
}

function mapData(data: CombinedUnCamelCasedManga): CombinedManga[] {
  return mapArrayToCamelCase(data).map(({ profileManga: [profileManga], ...rest }) => {
    if (profileManga) {
      return { ...rest, ...propertiesToCamelCase(profileManga), hasProfileManga: true };
    }

    return { ...rest, hasProfileManga: false };
  });
}
