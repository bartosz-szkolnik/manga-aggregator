import { formatDate } from './db';
import { MangadexChapterList, MangadexResponse } from './types';

export async function getChaptersFor(mangaId: string) {
  const params = new URLSearchParams({
    limit: '200',
    'translatedLanguage[]': 'en',
  });

  return fetch(`https://api.mangadex.org/manga/${mangaId}/feed?${params}`)
    .then(resp => resp.json() as Promise<MangadexResponse>)
    .then(resp => resp.data);
}

export async function getMangasChapters(mangaIds: string[]) {
  const requests = mangaIds.map(getChaptersFor);
  return Promise.all(requests);
}

export async function getLatestChaptersFor(mangaId: string, since: Date): Promise<MangadexChapterList> {
  const params = new URLSearchParams({
    limit: '10',
    manga: mangaId,
    'translatedLanguage[]': 'en',
    updatedAtSince: formatDate(since),
  });

  return fetch(`https://api.mangadex.org/chapter?${params}`).then(r => r.json());
}
