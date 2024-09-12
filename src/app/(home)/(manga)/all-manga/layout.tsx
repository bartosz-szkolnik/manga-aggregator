import { Separator } from '@components/ui/separator';
import { TabLinkContainer, TabLink } from '@components/ui/tab-link';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { getTheMetaSymbol } from '@utils/utils';
import { ReactNode, Suspense } from 'react';
import Loading from '../../loading';
import { createServerClient } from '@utils/supabase/server';
import { BookCopy, Table } from 'lucide-react';
import { TitleFilter } from '@lib/table';

export default async function AllMangaLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn } = await createServerClient();

  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">All Available Manga</h2>
          <p className="text-sm text-muted-foreground">Here&apos;s a list of all available manga.</p>
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()} button pressed, you can open any of them directly on MangaDex.
            </strong>
          </p>
        </div>
        <div className="mb-6 ml-2 flex items-center">
          {isLoggedIn && <AddMangaToDatabaseDialog className="ml-auto mr-4" />}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="my-6 flex items-center justify-between">
        <TabLinkContainer>
          <TabLink href="/all-manga/browse">
            <BookCopy className="mr-2 h-5 w-5" />
            Browse
          </TabLink>
          <TabLink href="/all-manga/table">
            <Table className="mr-2 h-5 w-5" />
            Table
          </TabLink>
        </TabLinkContainer>
        <TitleFilter onlyFilterSearchParam />
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
