import type {
  CheckEvery,
  CurrentReadingStatus,
  Manga as DbManga,
  Profile as DbProfile,
  ProfileManga as DbProfileManga,
  _Manga as Manga,
  _Profile as Profile,
  _ProfileManga as ProfileManga,
  TimePeriod,
} from './types';

export function mapDbMangaToManga({
  check_every,
  created_at,
  image_url,
  is_completed,
  last_time_checked,
  mangadex_id,
  ...rest
}: DbManga): Manga {
  return {
    checkEvery: validateCheckEveryField(check_every),
    createdAt: created_at,
    imageUrl: image_url,
    isCompleted: is_completed,
    lastTimeChecked: last_time_checked,
    mangadexId: mangadex_id,
    ...rest,
  };
}

export function mapDbProfileToProfile({ avatar_url, created_at, ...rest }: DbProfile): Profile {
  return {
    avatarUrl: avatar_url,
    createdAt: created_at,
    ...rest,
  };
}

export function mapDbProfileMangaToProfileManga({
  created_at,
  current_reading_status,
  is_following,
  is_in_library,
  latest_chapter_read,
  manga_id,
  profile_id,
  ...rest
}: DbProfileManga): ProfileManga {
  return {
    createdAt: created_at,
    currentReadingStatus: validateCurrentReadingStatus(current_reading_status),
    isFollowing: is_following,
    isInLibrary: is_in_library,
    latestChapterRead: latest_chapter_read,
    mangaId: manga_id,
    profileId: profile_id,
    ...rest,
  };
}

const checkEveryPossibleValues: CheckEvery[] = [
  'everyday',
  'every monday',
  'every tuesday',
  'every wednesday',
  'every thursday',
  'every friday',
  'every saturday',
  'every sunday',
];

const timePeriodPossibleValues: TimePeriod[] = ['days', 'months', 'weeks'];

function validateCheckEveryField(value: string | null): CheckEvery | null {
  if (!value) {
    return null;
  }

  if (checkEveryPossibleValues.includes(value as CheckEvery)) {
    return value as CheckEvery;
  }

  const [check, number, period] = value.split(' ');
  if (check === 'check' && Number.isFinite(number) && timePeriodPossibleValues.includes(period as TimePeriod)) {
    return value as CheckEvery;
  }

  return null;
}

const currentReadingStatusPossibleValues: CurrentReadingStatus[] = [
  'canceled',
  'finished reading',
  'postponed',
  'read later',
  'reading',
  'want to read',
];

function validateCurrentReadingStatus(value: string | null): CurrentReadingStatus | null {
  if (!value) {
    return null;
  }

  return currentReadingStatusPossibleValues.includes(value as CurrentReadingStatus)
    ? (value as CurrentReadingStatus)
    : null;
}
