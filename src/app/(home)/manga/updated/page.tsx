import { Separator } from '@components/ui/separator';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database';
import { Metadata } from 'next';
import { fetchUpdatedMangasCount } from '@manga/lib/updated/data';
import { TabsContent } from '@components/ui/tabs';
import { Suspense } from 'react';
import { UpdatedMangaGrid, UpdatedMangaTable } from '@manga/components/views/updated';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { LazyTableTabProps } from '@utils/pagination';
import { ServerError } from '@components/common/error/error.server';

export const metadata: Metadata = { title: 'Updated' };

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

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MangaPageHeader
          heading="Updated for You"
          subheading="Recently updated mangas you follow. You can read them here."
        />
        <div className="space-between mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
          {/* <OpenAllMangasButton mangaIds={mangaIds} /> */}
        </div>
      </div>
      <Separator className="my-4" />
      {/* TODO: Add Tabs skeleton */}
      <Suspense fallback={<p>Loading...</p>}>
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
  const { count, error } = await fetchUpdatedMangasCount();
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
        {/* TODO Add MangaGrid Skeleton */}
        <Suspense fallback={<p>Loading...</p>}>
          <UpdatedMangaGrid {...props} />
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
          <UpdatedMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
