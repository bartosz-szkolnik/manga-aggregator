import { Database } from './database.types';

export type Manga = Database['public']['Tables']['manga']['Row'];
export type Profile = Database['public']['Tables']['profile']['Row'];
export type ProfileManga = Database['public']['Tables']['profile_manga']['Row'];
