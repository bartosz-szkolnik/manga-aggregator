import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { logger } from '@utils/server/logger';
import { Metadata } from 'next';
import { fetchReadingNowMangasCount } from '@manga/lib/reading-now/data';
import { TabsContent } from '@components/ui/tabs';
import { Suspense } from 'react';
import { ReadingNowMangaGrid, ReadingNowMangaTable } from '@manga/components/views/reading-now';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { LazyTableTabProps } from '@utils/pagination';

export const metadata: Metadata = { title: 'Reading Now' };

type PageProps = {
  searchParams: Promise<{
    filter: string;
    size?: string;
    page?: string;
    tab?: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { filter = '', size = '10', page = '1', tab = 'grid' } = await props.searchParams;
  const { count, error } = await fetchReadingNowMangasCount(filter);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MangaPageHeader
          heading="Currectly Reading Mangas"
          subheading="Currently reading Mangas. You can read them here."
        />
        <div className="mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
        </div>
      </div>
      <Separator className="my-4" />

      <MangaQueryTabs tab={tab} count={count ?? 0}>
        {!count ? (
          <NoMangaPlaceholder text="You are all caught up! Good job!" />
        ) : (
          <>
            <LazyGridTab tab={tab} filter={filter} />
            <LazyTableTab tab={tab} filter={filter} page={page} size={size} count={count} />
          </>
        )}
      </MangaQueryTabs>
    </>
  );
}

async function LazyGridTab({ tab, filter }: { tab: string; filter: string }) {
  if (tab === 'grid') {
    return (
      <TabsContent value="grid">
        {/* TODO Add MangaGrid Skeleton */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReadingNowMangaGrid filter={filter} />
        </Suspense>
      </TabsContent>
    );
  }
}

async function LazyTableTab({ tab, ...props }: LazyTableTabProps) {
  if (tab === 'table') {
    return (
      <TabsContent value="table">
        {/* TODO Add MangaTable Skeleton */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReadingNowMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
