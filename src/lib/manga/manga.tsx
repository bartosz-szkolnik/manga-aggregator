import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { MangaArtwork } from './manga-artwork';
import { Manga as MangaType } from '@lib/types/manga.types';
import { MangaDrawer } from './manga-drawer';
import { FollowMangaButton } from '@manga/components/common/update-utils/components/follow-manga';
import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { Button } from '@components/ui/button';
import { UpdateProgressForm } from '@lib/update-progress';
import { FavoriteMangaButton } from '@manga/components/common/update-utils/components/favorite-manga';
import { ChevronRight } from 'lucide-react';
import { MangaImage } from './manga-image';
import { OpenMangaDexButton } from '@lib/open-mangadex-button';

type TriggerType = 'artwork' | 'chevron-button' | 'admin-button';

export type MangaProps = {
  id: MangaType['id'];
  title: MangaType['title'];
  description: MangaType['description'];
  imageUrl: MangaType['image_url'];
  lastTimeChecked: MangaType['last_time_checked'];
  checkEveryPeriod: MangaType['check_every_period'];
  checkEveryNumber: MangaType['check_every_number'];
  latestChapter: MangaType['latest_chapter'];
  mangaStatus: MangaType['manga_status'];
  mangadexId: MangaType['mangadex_id'];
  trigger?: TriggerType;
};

async function getData(supabase: SupabaseServerClient, mangaId: MangaType['id']) {
  const { data, error } = await supabase
    .from('profile_manga')
    .select('is_following, latest_chapter_read, reading_status, priority, is_in_library, is_favorite')
    .eq('manga_id', mangaId)
    .single();

  if (error) {
    return {
      is_following: false,
      latest_chapter_read: null,
      reading_status: null,
      priority: null,
      is_in_library: false,
      is_favorite: false,
    };
  }

  return data;
}

export async function Manga({
  trigger = 'artwork',
  id,
  title,
  mangadexId,
  latestChapter = '0',
  description,
  imageUrl,
}: MangaProps) {
  const { supabase } = await createServerClient();
  const data = await getData(supabase, id);

  const isInLibrary = data.is_in_library;

  if (trigger === 'chevron-button') {
    return (
      <Sheet key={mangadexId}>
        <SheetTrigger asChild>
          <Button size="xs">
            Open
            <ChevronRight />
          </Button>
        </SheetTrigger>
        <MangaDrawer mangaDexId={mangadexId} title={title} description={description}>
          <div className="mt-4">
            <MangaImage imageUrl={imageUrl} title={title} width={210} height={280} showAnimation={false} />
          </div>
          <div className="mt-4 grid gap-4 py-4">
            {/* <OpenMangaDexButton id={mangadexId} className="w-full"></OpenMangaDexButton> */}
            {/* <AddMangaToUserLibraryButton mangaId={id} isInLibrary={isInLibrary} />
            {isInLibrary && <FollowMangaButton mangaId={id} isFollowing={data.is_following} />}
            {isInLibrary && <FavoriteMangaButton mangaId={id} isFavorite={data.is_favorite} />}
            {isInLibrary && (
              <UpdateProgressForm
                latestChapterRead={data.latest_chapter_read ?? '0'}
                readingStatus={data.reading_status ?? 'want to read'}
                latestChapter={latestChapter ?? '0'}
                priority={data.priority ?? 'normal'}
                mangaId={id}
              />
            )} */}
          </div>
        </MangaDrawer>
      </Sheet>
    );
  }

  if (trigger === 'artwork') {
    const chaptersBehind = Number(latestChapter ?? 0) - Number(data.latest_chapter_read ?? 0);

    return (
      <Sheet key={mangadexId}>
        <MangaArtwork
          manga={manga}
          className="min-w-[250px] max-w-[550px] md:max-w-[350px]"
          width={250}
          height={330}
          chaptersBehind={chaptersBehind}
        />
        <MangaDrawer mangaDexId={mangadex_id} title={title} description={description}>
          <div className="mt-4">
            <MangaImage imageUrl={manga.image_url} title={manga.title} width={210} height={280} showAnimation={false} />
          </div>
          <div className="mt-4 grid gap-4 py-4">
            {/* <OpenMangaDexButton id={mangadex_id} className="w-full"></OpenMangaDexButton>
            <AddMangaToUserLibraryButton mangaId={manga.id} isInLibrary={isInLibrary} />
            {isInLibrary && <FollowMangaButton mangaId={manga.id} isFollowing={data?.is_following} />}
            {isInLibrary && <FavoriteMangaButton mangaId={manga.id} isFavorite={data.is_favorite} />}
            {isInLibrary && (
              <UpdateProgressForm
                latestChapterRead={data.latest_chapter_read ?? '0'}
                readingStatus={data.reading_status ?? 'want to read'}
                latestChapter={manga.latest_chapter ?? '0'}
                priority={data.priority ?? 'normal'}
                mangaId={manga.id}
              /> */}
            {/* )} */}
          </div>
        </MangaDrawer>
      </Sheet>
    );
  }

  // if (trigger === 'admin-button') {
  //   return (
  //     <Sheet key={mangadex_id}>
  //       <SheetTrigger asChild>
  //         <Button size="xs">
  //           Open
  //           <ChevronRight />
  //         </Button>
  //       </SheetTrigger>
  //       <MangaDrawer mangaDexId={mangadex_id} title={title} description={description}>
  //         <div className="mt-4">
  //           <MangaImage imageUrl={manga.image_url} title={manga.title} width={210} height={280} showAnimation={false} />
  //         </div>
  //         <div className="mt-4 grid gap-4 py-4">
  //           <RemoveMangaFromDatabaseButton mangaId={manga.id} />
  //           <EditMangaAttributesDialog data={manga} />
  //         </div>
  //       </MangaDrawer>
  //     </Sheet>
  //   );
  // }
}
