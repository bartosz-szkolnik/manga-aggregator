import { Description, Title } from '@manga/types';

export function openMangaDex(mangaDexId: string) {
  window.open(`https://mangadex.org/title/${mangaDexId}`);
}

export function getMangaTitle(title: Title) {
  return title.en || title.jp || title.ja || title['jp-ro'] || title['ja-ro'] || 'No title available...';
}

export function getMangaDescription(description: Description) {
  return (
    description.en ||
    description.jp ||
    description.ja ||
    description['jp-ro'] ||
    description['ja-ro'] ||
    'No description available...'
  );
}

export function getMangaChaptersBehind(
  latestChapter: string | null | undefined,
  latestChapterRead: string | null | undefined,
) {
  const latest = Number(latestChapter ?? 0);
  const latestRead = Number(latestChapterRead ?? 0);
  if (Number.isInteger(latest) && Number.isInteger(latestRead)) {
    return Number(latest ?? 0) - Number(latestRead ?? 0);
  }

  return (Math.trunc(latest * 10) - Math.trunc(latestRead * 10)) / 10;
}
