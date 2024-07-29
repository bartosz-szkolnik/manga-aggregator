import { Statistic } from '@components/statistics/statistic';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { TabLink, TabLinkContainer } from '@components/ui/tab-link';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database/add-manga-to-database-dialog';
import { Profile } from '@lib/types/manga.types';
import { SupabaseBrowserClient } from '@utils/supabase/client';
import { createServerClient } from '@utils/supabase/server';
import { Book, BookCheck } from 'lucide-react';
import { ReactNode } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const { supabase, userId } = await createServerClient();

  if (!userId) {
    return (
      <main className="px-4 py-6 lg:px-8">
        <p className="mb-4">You&apos;re not logged in</p>
        <Button asChild>
          <Link href={'/auth/sign-in'}>Go to sign in page</Link>
        </Button>
      </main>
    );
  }

  const [mangasRead, mangasPlannedToRead, updatedAmount, currentlyReadAmount] = await Promise.all([
    getMangasReadAmount(supabase, userId),
    getMangasPlannedToReadAmount(supabase, userId),
    getUpdatedMangasAmount(supabase, userId),
    getCurrentlyReadAmount(supabase, userId),
  ]);

  return (
    <>
      <main className="flex h-full max-h-full flex-col px-4 py-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Statistic title="Mangas read" icon={BookCheck}>
            <div className="text-2xl font-bold">{mangasRead}</div>
            <p className="text-xs text-muted-foreground">Good job and keep going!</p>
          </Statistic>
          <Statistic title="Mangas planned to read" icon={Book}>
            <div className="text-2xl font-bold">{mangasPlannedToRead}</div>
            <p className="text-xs text-muted-foreground">Good job and keep going!</p>
          </Statistic>
        </div>
        <div className="space-between my-6 flex items-center">
          <TabLinkContainer>
            {updatedAmount > 0 && <TabLink href="/updated">Updated For You</TabLink>}
            {currentlyReadAmount > 0 && <TabLink href="/currently-reading">Currently Reading</TabLink>}
            <TabLink href="/in-your-library">In Your Library</TabLink>
            <TabLink href="/all-manga">All Available Manga</TabLink>
          </TabLinkContainer>
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
        </div>
        {/* TODO fix the height issue */}
        <div className="max-h-[81%] flex-1">{children}</div>
      </main>
    </>
  );
}

async function getMangasReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'finished reading', profile_id: userId });
  return count;
}

async function getMangasPlannedToReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'want to read', profile_id: userId });
  return count;
}

async function getUpdatedMangasAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count, data } = await supabase
    .from('profile_manga')
    .select('*', { count: 'exact' })
    .match({ profile_id: userId, is_updated: true, is_following: true });

  return count ?? 0;
}

async function getCurrentlyReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ profile_id: userId, reading_status: 'reading' });
  return count ?? 0;
}
