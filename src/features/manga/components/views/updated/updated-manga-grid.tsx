import { logger } from '@utils/server/logger';
import { fetchUpdatedMangasToGrid } from '@manga/lib/updated/data';
import { MangaGridResponse } from '@manga/lib/types';
import { MangaGrid } from '@manga/components/grid';

type UpdatedMangaGridProps = {
  filter: string;
};

export async function UpdatedMangaGrid({ filter }: UpdatedMangaGridProps) {
  const { error, data, offset, total } = await fetchUpdatedMangasToGrid(filter);
  // const mangadexIds = mangas.map(manga => manga.mangadexId);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchUpdatedMangasToGrid(filter, offset);

    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasFn={loadMoreMangas} />;
}
