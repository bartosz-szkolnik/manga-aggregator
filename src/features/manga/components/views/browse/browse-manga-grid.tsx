import { fetchMangasToBrowseToGrid } from '@manga/lib/browse/data';
import { MangaGrid } from '@manga/components/grid';
import { MangaGridResponse } from '@manga/lib/types';
import { ServerError } from '@components/common/error/error.server';
import { getCookieForRefetching } from '@manga/utils/refetch-manga/refetch-manga.server';

type BrowseMangaGridProps = {
  filter: string;
  count: number;
};

export async function BrowseMangaGrid({ filter, count }: BrowseMangaGridProps) {
  const howMany = await getCookieForRefetching();
  const { error, data, offset, total } = await fetchMangasToBrowseToGrid(filter, count, 0, howMany);
  if (error) {
    return <ServerError error={error} />;
  }

  async function loadMoreMangas(offset: number): Promise<MangaGridResponse> {
    'use server';
    const { error, data, offset: newOffset, total } = await fetchMangasToBrowseToGrid(filter, count, offset);
    if (error) {
      return { data: [], offset: 0, total: 0 };
    }

    return { data, offset: newOffset, total };
  }

  return <MangaGrid response={{ data, offset, total }} loadMoreMangasAction={loadMoreMangas} />;
}
