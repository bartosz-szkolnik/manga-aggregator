import { Description, Title } from '@lib/types/mangadex.types';

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
