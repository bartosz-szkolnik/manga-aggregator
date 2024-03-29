import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { MangaEmptyPlaceholder } from '../../components/shared/manga-empty-placeholder';
import { MangaArtwork } from '../../components/shared/manga-artwork';
import { AddMangaDialog } from '../../components/shared/add-manga-dialog';
import { createServerClient } from '../../utils/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Manga Aggregator',
  description: '',
};

export default async function HomePage() {
  const { supabase } = await createServerClient();
  const { data } = await supabase.from('profile_manga').select('*, manga(*)');

  return (
    <Tabs defaultValue="current" className="h-full space-y-6">
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="current" className="relative">
            Recently updated
          </TabsTrigger>
          <TabsTrigger value="current-2">Currently reading</TabsTrigger>
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
            <h2 className="text-3xl font-bold tracking-tight">Home</h2>
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
  );
}
