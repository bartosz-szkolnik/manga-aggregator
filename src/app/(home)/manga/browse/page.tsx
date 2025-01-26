import { TabsContent } from '@components/ui/tabs';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Separator } from '@components/ui/separator';
import { fetchMangasToBrowseCount } from '@manga/lib/browse/data';
import { BrowseMangaGrid, BrowseMangaTable } from '@manga/components/views/browse';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { LazyTableTabProps } from '@utils/pagination';
import { AddMangaButtonIfAllowed } from '@manga/components/common/add-manga-button-if-allowed';
import { ServerError } from '@components/common/error/error.server';
import { MangaGridSkeleton, MangaTableSkeleton, QueryTabsSkeleton } from '@components/skeletons';

export const metadata: Metadata = { title: 'Browse' };

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
      <div className="flex flex-wrap justify-between gap-4">
        <MangaPageHeader heading="All Available Manga" subheading="Here's a list of all available manga." />
        <div className="mb-6 ml-2 flex items-center">
          <AddMangaButtonIfAllowed />
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
  const { count, error } = await fetchMangasToBrowseCount(filter);
  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <MangaQueryTabs tab={tab} count={count ?? 0}>
      {!count ? (
        <NoMangaPlaceholder
          description="If you want some, you can go directly to MangaDex to browse there and add it to our database."
          showBrowseMangaLink={false}
        />
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
          <BrowseMangaGrid {...props} />
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
          <BrowseMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
