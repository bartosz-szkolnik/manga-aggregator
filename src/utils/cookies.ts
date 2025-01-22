const ONE_WEEK = 60 * 60 * 24 * 7;

export function saveToCookies(key: string, value: string, duration = ONE_WEEK) {
  document.cookie = `${key}=${value}; path=/; max-age=${duration}`;
}

export function deleteCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
