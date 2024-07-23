import { createServerClient } from '@utils/supabase/server';
import { TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';
import { AllMangas } from './components/all-mangas';
import { UpdatedForYou } from './components/updated-for-you';
import { CurrentlyReading } from './components/currently-reading';
import { Metadata } from 'next';
import { Link } from '@components/ui/link';
import { Button } from '@components/ui/button';
import { QueryParamsTabs } from '@components/ui/query-params-tabs';

export const metadata: Metadata = {
  title: 'Home · Manga Aggregator',
};

export default async function HomePage() {
  const { isLoggedIn } = await createServerClient();

  if (!isLoggedIn) {
    return (
      <main className="px-4 py-6 lg:px-8">
        {/* <AllMangas /> */}
        <p className="mb-4">You&apos;re not logged in</p>
        <Button asChild>
          <Link href={'/auth/sign-in'}>Go to sign in page</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="h-full p-4 py-6 lg:p-8">
      <QueryParamsTabs defaultValue={isLoggedIn ? 'updated' : 'show-all'} className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            {isLoggedIn && <TabsTrigger value="updated">Updated For You</TabsTrigger>}
            <TabsTrigger value="currently-reading">Currently Reading</TabsTrigger>
            <TabsTrigger value="in-library" disabled>
              In Your Library
            </TabsTrigger>
            <TabsTrigger value="all-available-manga">All Available Manga</TabsTrigger>
          </TabsList>
          <div className="ml-auto mr-4">
            <AddMangaDialog />
          </div>
        </div>
        <TabsContent value="updated">
          <UpdatedForYou />
        </TabsContent>
        <TabsContent value="currently-reading">
          <CurrentlyReading />
        </TabsContent>
        <TabsContent value="in-library">Show me manga from my library.</TabsContent>
        <TabsContent value="show-all">Show me all manga.</TabsContent>
        <TabsContent value="all-available-manga">
          <AllMangas />
        </TabsContent>
      </QueryParamsTabs>
    </main>
  );
}
