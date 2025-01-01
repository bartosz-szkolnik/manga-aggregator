import { Separator } from '@components/ui/separator';
import { TabsContent } from '@components/ui/tabs';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { UserLibraryMangaGrid, UserLibraryMangaTable } from '@manga/components/views/user-library';
import { fetchMangasFromUserLibraryCount } from '@manga/lib/user-library/data';
import { LazyTableTabProps } from '@utils/pagination';
import { logger } from '@utils/server/logger';
import { Metadata } from 'next';
import { Suspense } from 'react';

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
  const { error, count } = await fetchMangasFromUserLibraryCount();

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <div className="max-h-full">
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

      <MangaQueryTabs tab={tab} count={count ?? 0}>
        {!count ? (
          <NoMangaPlaceholder showYourLibraryLink={false} />
        ) : (
          <>
            <LazyGridTab tab={tab} filter={filter} />
            <LazyTableTab tab={tab} filter={filter} page={page} size={size} count={count} />
          </>
        )}
      </MangaQueryTabs>
    </div>
  );
}

async function LazyGridTab({ tab, filter }: { tab: string; filter: string }) {
  if (tab === 'grid') {
    return (
      <TabsContent value="grid">
        {/* TODO Add MangaGrid Skeleton */}
        <Suspense fallback={<p>Loading...</p>}>
          <UserLibraryMangaGrid filter={filter} />
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
