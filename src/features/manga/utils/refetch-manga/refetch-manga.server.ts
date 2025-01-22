import { cookies } from 'next/headers';
import { REFETCH_MANGA_USE_COOKIE, REFETCH_MANGA_HOW_MANY_COOKIE } from './refetch-manga';

export async function setRefetchMangaUseCookieToTrue() {
  const cookie = await cookies();
  cookie.set(REFETCH_MANGA_USE_COOKIE, String(true));
}

export async function getCookieForRefetching() {
  const cookie = await cookies();

  const whetherToUse = cookie.get(REFETCH_MANGA_USE_COOKIE)?.value as 'true' | 'false';
  const howMany = whetherToUse === 'true' ? cookie.get(REFETCH_MANGA_HOW_MANY_COOKIE)?.value : '10';

  return Number(howMany);
}
