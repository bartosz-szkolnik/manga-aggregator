import { Enums, Tables } from './database.types';

export type Manga = Tables<'manga'>;
export type Profile = Tables<'profile'>;
export type ProfileManga = Tables<'profile_manga'>;
export type ReadingStatus = Enums<'reading_status'>;
export type MangaStatus = Enums<'manga_status'>;
export type Priority = Enums<'priority'>;
export type Period = Enums<'check_every_period'>;
