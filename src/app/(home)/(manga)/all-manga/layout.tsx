import { Separator } from '@components/ui/separator';
import { TabLinkContainer, TabLink } from '@components/ui/tab-link';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { getTheCtrlSymbol, getTheMetaSymbol } from '@utils/common';
import { ReactNode, Suspense } from 'react';
import Loading from '../../loading';
import { createServerClient } from '@utils/supabase/server';
import { BookCopy, Table } from 'lucide-react';
import { TitleFilter } from '@lib/table';
import { verifyAccess } from '@utils/auth';

export default async function AllMangaLayout({ children }: { children: ReactNode }) {
  const { profile } = await createServerClient();

  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">All Available Manga</h2>
          <p className="text-sm text-muted-foreground">Here&apos;s a list of all available manga.</p>
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()}/{getTheCtrlSymbol()} button pressed, you can open any of them
              directly on MangaDex.
            </strong>
          </p>
        </div>
        <div className="mb-6 ml-2 flex items-center">
          {verifyAccess(profile).includes('add') && <AddMangaToDatabaseDialog className="ml-auto mr-4" />}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mb-10 mt-6 flex flex-wrap items-center justify-between gap-4">
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
