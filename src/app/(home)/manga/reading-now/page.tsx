import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { Metadata } from 'next';
import { fetchReadingNowMangasCount } from '@manga/lib/reading-now/data';
import { TabsContent } from '@components/ui/tabs';
import { Suspense } from 'react';
import { ReadingNowMangaGrid, ReadingNowMangaTable } from '@manga/components/views/reading-now';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { LazyTableTabProps } from '@utils/pagination';
import { ServerError } from '@components/common/error/error.server';
import { MangaGridSkeleton, MangaTableSkeleton, QueryTabsSkeleton } from '@components/skeletons';

export const metadata: Metadata = { title: 'Reading Now' };

type PageProps = {
  searchParams: Promise<{
    filter: string;
    size?: string;
    page?: string;
    tab?: 'grid' | 'table';
  }>;
};

export default async function Page(props: PageProps) {
  const { filter = '', size = '10', page = '1', tab = 'grid' } = await props.searchParams;

  return (
    <main>
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
      <Suspense fallback={<QueryTabsSkeleton tab={tab} />}>
        <QueryTabs filter={filter} page={page} size={size} tab={tab} />
      </Suspense>
    </main>
  );
}

type QueryTabsProps = {
  tab: string;
  filter: string;
  page: string;
  size: string;
};

async function QueryTabs({ tab, filter, page, size }: QueryTabsProps) {
  const { count, error } = await fetchReadingNowMangasCount(filter);
  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <MangaQueryTabs tab={tab} count={count ?? 0}>
      {!count ? (
        <NoMangaPlaceholder text="You are all caught up! Good job!" />
      ) : (
        <>
          <LazyGridTab tab={tab} filter={filter} count={count} />
          <LazyTableTab tab={tab} filter={filter} page={page} size={size} count={count} />
        </>
      )}
    </MangaQueryTabs>
  );
}

async function LazyGridTab({ tab, ...props }: { tab: string; filter: string; count: number }) {
  if (tab === 'grid') {
    return (
      <TabsContent value="grid">
        <Suspense fallback={<MangaGridSkeleton />}>
          <ReadingNowMangaGrid {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}

async function LazyTableTab({ tab, ...props }: LazyTableTabProps) {
  if (tab === 'table') {
    return (
      <TabsContent value="table">
        <Suspense fallback={<MangaTableSkeleton />}>
          <ReadingNowMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
