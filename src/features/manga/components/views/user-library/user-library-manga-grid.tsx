import { logger } from '@utils/server/logger';
import { fetchMangasFromUserLibraryToGrid } from '@manga/lib/user-library/data';
import { MangaGridResponse } from '@manga/lib/types';
import { MangaGrid } from '@manga/components/grid';

type UserLibraryMangaGridProps = {
  filter: string;
};

export async function UserLibraryMangaGrid({ filter }: UserLibraryMangaGridProps) {
  const { error, data, offset, total } = await fetchMangasFromUserLibraryToGrid(filter);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchMangasFromUserLibraryToGrid(filter, offset);

    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasFn={loadMoreMangas} />;
}
