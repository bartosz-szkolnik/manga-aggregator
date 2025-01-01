import { logger } from '@utils/server/logger';
import { fetchReadingNowMangasToGrid } from '@manga/lib/reading-now/data';
import { MangaGrid } from '@manga/components/grid';
import { MangaGridResponse } from '@manga/lib/types';

type ReadingNowMangaGridProps = {
  filter: string;
};

export async function ReadingNowMangaGrid({ filter }: ReadingNowMangaGridProps) {
  const { error, data, offset, total } = await fetchReadingNowMangasToGrid(filter);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchReadingNowMangasToGrid(filter, offset);

    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasAction={loadMoreMangas} />;
}
