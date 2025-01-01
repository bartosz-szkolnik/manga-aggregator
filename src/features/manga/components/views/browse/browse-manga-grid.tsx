import { logger } from '@utils/server/logger';
import { fetchMangasToBrowseToGrid } from '@manga/lib/browse/data';
import { MangaGrid } from '@manga/components/grid';
import { MangaGridResponse } from '@manga/lib/types';

type BrowseMangaGridProps = {
  filter: string;
};

export async function BrowseMangaGrid({ filter }: BrowseMangaGridProps) {
  const { error, data, offset, total } = await fetchMangasToBrowseToGrid(filter);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchMangasToBrowseToGrid(filter, offset);

    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasAction={loadMoreMangas} />;
}
