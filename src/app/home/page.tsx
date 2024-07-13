import { createServerClient } from '@utils/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';
import { RecentlyUpdated } from './components/recently-updated';
import { SignOutButton } from '@components/sign-out-button';

export default async function HomePage() {
  const { isLoggedIn } = await createServerClient();

  return (
    <main>
      <h1>Home page</h1>
      is logged in? {isLoggedIn ? 'Yes' : 'No'}
      <SignOutButton />
      <hr />
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue={isLoggedIn ? 'updated' : 'show-all'} className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              {isLoggedIn && <TabsTrigger value="updated">Updated Recently</TabsTrigger>}
              <TabsTrigger value="currently-reading">Currently Reading</TabsTrigger>
              <TabsTrigger value="in-library" disabled>
                In Your Library
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <AddMangaDialog />
            </div>
          </div>
          <TabsContent value="updated">
            <RecentlyUpdated />
          </TabsContent>
          <TabsContent value="currently-reading">Show me currently read manga.</TabsContent>
          <TabsContent value="in-library">Show me manga from my library.</TabsContent>
          <TabsContent value="show-all">Show me all manga.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
