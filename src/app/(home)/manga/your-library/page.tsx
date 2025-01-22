import { Separator } from '@components/ui/separator';
import { TabsContent } from '@components/ui/tabs';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { UserLibraryMangaGrid, UserLibraryMangaTable } from '@manga/components/views/user-library';
import { fetchMangasFromUserLibraryCount } from '@manga/lib/user-library/data';
import { LazyTableTabProps } from '@utils/pagination';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ServerError } from '@components/common/error/error.server';

export const metadata: Metadata = { title: 'Your Library' };

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
          heading="Your Library"
          subheading="All of your Mangas in one place. You can browse them here."
        />
        <div className="mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
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
  const { error, count } = await fetchMangasFromUserLibraryCount();
  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <MangaQueryTabs tab={tab} count={count ?? 0}>
      {!count ? (
        <NoMangaPlaceholder showYourLibraryLink={false} />
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
          <UserLibraryMangaGrid {...props} />
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
          <UserLibraryMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
