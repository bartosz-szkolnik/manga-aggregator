import { PropertiesToCamelCase } from '@utils/utils';
import { Enums, Tables } from '@lib/types';

export type Manga = PropertiesToCamelCase<Tables<'manga'>>;
export type Profile = PropertiesToCamelCase<Tables<'profile'>>;
export type ProfileManga = PropertiesToCamelCase<Tables<'profile_manga'>>;
export type ReadingStatus = Enums<'reading_status'>;
export type MangaStatus = Enums<'manga_status'>;
export type Priority = Enums<'priority'>;
export type Period = Enums<'check_every_period'>;
export type Role = Enums<'profile_role'>;

export type UnCamelCasedManga = Tables<'manga'>;
export type UnCamelCasedProfileManga = Tables<'profile_manga'>;
