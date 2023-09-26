import { Database } from './database.types';

export type Manga = Database['public']['Tables']['manga']['Row'];
export type Profile = Database['public']['Tables']['profile']['Row'];
export type ProfileManga = Database['public']['Tables']['profile_manga']['Row'];
export type CurrentReadingStatus = Database['public']['Enums']['current_reading_status'];

type DbManga = Manga;
type DbProfile = Profile;
type DbProfileManga = ProfileManga;

export type TimePeriod = 'days' | 'weeks' | 'months';
type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type CheckEvery = 'everyday' | `every ${number} ${TimePeriod}` | `every ${Days}`;

export type Priority = 'medium' | 'high' | 'low';

export type _Manga = {
  checkEvery: CheckEvery | null;
  createdAt: DbManga['created_at'];
  id: DbManga['id'];
  imageUrl: DbManga['image_url'];
  isCompleted: DbManga['is_completed'];
  lastTimeChecked: DbManga['last_time_checked'];
  mangadexId: DbManga['mangadex_id'];
  title: DbManga['title'];
};

export type _Profile = {
  avatarUrl: DbProfile['avatar_url'];
  createdAt: DbProfile['created_at'];
  id: DbProfile['id'];
  name: DbProfile['name'];
  subscriptions: DbProfile['subscriptions'];
  username: DbProfile['username'];
};

export type _ProfileManga = {
  createdAt: DbProfileManga['created_at'];
  currentReadingStatus: CurrentReadingStatus | null;
  id: DbProfileManga['id'];
  isFollowing: DbProfileManga['is_following'];
  isInLibrary: DbProfileManga['is_in_library'];
  latestChapterRead: DbProfileManga['latest_chapter_read'];
  mangaId: DbProfileManga['manga_id'];
  profileId: DbProfileManga['profile_id'];
  priority: DbProfileManga['priority'];
};
