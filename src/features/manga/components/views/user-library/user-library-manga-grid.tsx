import { fetchMangasFromUserLibraryToGrid } from '@manga/lib/user-library/data';
import { MangaGridResponse } from '@manga/lib/types';
import { MangaGrid } from '@manga/components/grid';
import { ServerError } from '@components/common/error/error.server';
import { getCookieForRefetching } from '@manga/utils/refetch-manga/refetch-manga.server';

type UserLibraryMangaGridProps = {
  filter: string;
  count: number;
};

export async function UserLibraryMangaGrid({ filter, count }: UserLibraryMangaGridProps) {
  const howMany = await getCookieForRefetching();
  const { error, data, offset, total } = await fetchMangasFromUserLibraryToGrid(filter, count, 0, howMany);

  if (error) {
    return <ServerError error={error} />;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchMangasFromUserLibraryToGrid(filter, count, offset);

    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasAction={loadMoreMangas} />;
}
