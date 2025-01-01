import { TabsContent } from '@components/ui/tabs';
import { NoMangaPlaceholder } from '@manga/components/common/no-mangas-placeholder';
import { logger } from '@utils/server/logger';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Separator } from '@components/ui/separator';
import { fetchMangasToBrowseCount } from '@manga/lib/browse/data';
import { BrowseMangaGrid, BrowseMangaTable } from '@manga/components/views/browse';
import { MangaPageHeader, MangaQueryTabs } from '@manga/components/common';
import { LazyTableTabProps } from '@utils/pagination';
import { verifyAccess } from '@utils/auth';
import { AddMangaToDatabaseDialog } from '@manga/components/common/add-manga-to-database';

export const metadata: Metadata = { title: 'Browse' };

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
  const { count, profile, error } = await fetchMangasToBrowseCount(filter);

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        <MangaPageHeader heading="All Available Manga" subheading="Here's a list of all available manga." />
        <div className="mb-6 ml-2 flex items-center">
          {verifyAccess(profile).includes('add') && <AddMangaToDatabaseDialog className="ml-auto mr-4" />}
        </div>
      </div>
      <Separator className="my-4" />
      <MangaQueryTabs tab={tab} count={count ?? 0}>
        {!count ? (
          <NoMangaPlaceholder
            description="If you want some, you can go directly to MangaDex to browse there and add it to our database."
            showAllAvailableMangaLink={false}
          />
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
          <BrowseMangaGrid filter={filter} />
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
          <BrowseMangaTable {...props} />
        </Suspense>
      </TabsContent>
    );
  }
}
