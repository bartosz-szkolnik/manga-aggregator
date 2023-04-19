import { format } from 'date-fns';
import { supabase } from '../supabase';

export function formatDate(date: Date) {
  return `${format(date, 'yyyy-MM-dd')}T${format(date, 'hh:mm:ss')}`;
}

export type Manga = {
  name: string;
  mangaId: string;
  address: string;
  checkEvery: 'everyday' | 'every week';
  lastTimeChecked: Date;
  lastChapterId: string;
};

export type Chapter = {
  number: string;
  chapterId: string;
  name: string;
  isRead: boolean;
};

export type Manga2 = Exclude<Awaited<ReturnType<typeof getMangas>>['data'], undefined | null>[number];

export async function getMangas() {
  return supabase.from('manga').select();
}

export async function getManga(mangaId: string) {
  return supabase.from('manga').select().eq('mangadex_id', mangaId);
}
