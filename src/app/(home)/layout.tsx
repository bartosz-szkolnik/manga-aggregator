import { Statistic } from '@components/statistics/statistic';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { TabLink, TabLinkContainer } from '@components/ui/tab-link';
import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';
import { createServerClient } from '@utils/supabase/server';
import { Book, BookCheck } from 'lucide-react';
import { ReactNode } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, supabase } = await createServerClient();

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

  const { count: mangasRead } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .eq('reading_status', 'finished reading');

  const { count: mangasPlanToRead } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .eq('reading_status', 'want to read');

  return (
    <>
      <main className="flex h-full max-h-full flex-col px-4 py-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Statistic title="Mangas read" icon={BookCheck}>
            <div className="text-2xl font-bold">{mangasRead}</div>
            <p className="text-xs text-muted-foreground">Good job and keep going!</p>
          </Statistic>
          <Statistic title="Mangas planned to read" icon={Book}>
            <div className="text-2xl font-bold">{mangasPlanToRead}</div>
            <p className="text-xs text-muted-foreground">Good job and keep going!</p>
          </Statistic>
        </div>
        <div className="space-between my-6 flex items-center">
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
        {/* TODO fix the height issue */}
        <div className="max-h-[81%] flex-1">{children}</div>
      </main>
    </>
  );
}
