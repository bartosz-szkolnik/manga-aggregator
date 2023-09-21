import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { MangaEmptyPlaceholder } from '../components/manga-empty-placeholder';
import { Sidebar } from '../components/layout/sidebar';
import { Database } from '../lib/database.types';
import { MangaArtwork } from '../components/manga-artwork';
import { AddMangaDialog } from '../components/add-manga-dialog';
import { Nav } from '../components/layout/nav';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('profile_manga').select('*, manga(*)');

  return (
    <>
      <div className="md:hidden">I don't know when I will be visible</div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <Nav></Nav>
            <div className="grid lg:grid-cols-5">
              <Sidebar lists={[]}></Sidebar>
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="current" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="current" className="relative">
                          Current
                        </TabsTrigger>
                        <TabsTrigger value="current-2">Current 2</TabsTrigger>
                        <TabsTrigger value="current-3" disabled>
                          Current 3
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <AddMangaDialog />
                      </div>
                    </div>
                    <TabsContent value="current" className="border-none p-0 outline-none">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">Read Now</h2>
                          <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {data?.map(mangaProfile => (
                              <MangaArtwork
                                key={mangaProfile.id}
                                manga={mangaProfile.manga!}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              ></MangaArtwork>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
                        <p className="text-sm text-muted-foreground">Your personal lists. Updated daily.</p>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent value="current-2" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">Read Later</h2>
                          <p className="text-sm text-muted-foreground">Your favorite mangas. Updated daily.</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <MangaEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
