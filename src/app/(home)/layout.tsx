import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { TabLink, TabLinkContainer } from '@components/ui/tab-link';
import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';
import { createServerClient } from '@utils/supabase/server';
import { ReactNode } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn } = await createServerClient();

  if (!isLoggedIn) {
    return (
      <main className="px-4 py-6 lg:px-8">
        <p className="mb-4">You&apos;re not logged in</p>
        <Button asChild>
          <Link href={'/auth/sign-in'}>Go to sign in page</Link>
        </Button>
      </main>
    );
  }

  return (
    <>
      <main className="h-full p-4 py-6 lg:p-8">
        <p>Here's some simple layout</p>
        <div className="space-between mb-4 flex items-center">
          <TabLinkContainer>
            <TabLink href="/updated">Updated For You</TabLink>
            <TabLink href="/currently-reading">Currently Reading</TabLink>
            <TabLink disabled href="/in-library">
              In Your Library
            </TabLink>
            <TabLink href="/all-manga">All Available Manga</TabLink>
          </TabLinkContainer>
          <AddMangaDialog className="ml-auto mr-4" />
        </div>
        {children}
      </main>
    </>
  );
}
