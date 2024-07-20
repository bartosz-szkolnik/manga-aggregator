import { Enums, Tables } from './database.types';

export type Manga = Tables<'manga'>;
export type Profile = Tables<'profile'>;
export type ProfileManga = Tables<'profile_manga'>;
export type CurrentReadingStatus = Enums<'current_reading_status'>;
export type Priority = Enums<'priority'>;
