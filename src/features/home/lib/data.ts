import { Manga, Profile, UnCamelCasedManga } from '@manga/types';
import { unauthorized } from '@utils/auth';
import { createServerClient } from '@utils/supabase/server';
import { mapArrayToCamelCase, propertiesToCamelCase } from '@utils/utils';

export async function fetchRecommendedMangas(offset = 0) {
  const { supabase, userId, profile } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error } = await supabase
    .from('manga')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })
    .range(offset, offset + 9);

  if (error) {
    return { error };
  }

  return { data: mapData(data), profile: propertiesToCamelCase(profile) } satisfies { data: Manga[]; profile: Profile };
}

export async function fetchMangasReadCount() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'finished reading', profile_id: userId });
  return count;
}

export async function fetchMangasPlannedToReadCount() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'want to read', profile_id: userId });
  return count;
}

export async function fetchProfile() {
  const { userId, profile } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  return { profile: propertiesToCamelCase(profile) };
}

function mapData(data: UnCamelCasedManga[]): Manga[] {
  return mapArrayToCamelCase(data).map(({ ...rest }) => {
    return { ...rest, hasProfileManga: false };
  });
}
