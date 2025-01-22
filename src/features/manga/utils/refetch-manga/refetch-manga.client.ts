import { saveToCookies } from '@utils/cookies';
import { REFETCH_MANGA_HOW_MANY_COOKIE, REFETCH_MANGA_USE_COOKIE } from './refetch-manga';

export function setHowManyMangasToRefetch(howMany: number) {
  saveToCookies(REFETCH_MANGA_HOW_MANY_COOKIE, String(howMany));
}

export function setRefetchMangaUseCookieToFalse() {
  saveToCookies(REFETCH_MANGA_USE_COOKIE, String(false));
}
