import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { MangaArtwork } from './manga-artwork';
import { Manga as MangaType } from '@lib/types/manga.types';
import { MangaDrawer } from './manga-drawer';
import { FollowMangaButton } from '@lib/follow-manga';
import { createServerClient, SupabaseServerClient } from '@utils/supabase/server';
import { Button } from '@components/ui/button';
import { UpdateProgressForm } from '@lib/update-progress';
import { FavoriteMangaButton } from '@lib/favorite-manga';
import { ChevronRight } from 'lucide-react';
import { MangaImage } from './manga-image';
import { AddMangaToUserLibraryButton } from '@lib/add-manga-to-user-library';
import { RemoveMangaFromDatabaseButton } from '@lib/remove-manga-from-database';
import { OpenMangaDexButton } from '@lib/open-mangadex-button';
import { EditMangaAttributesDialog } from '@lib/edit-manga-attributes';

type TriggerType = 'artwork' | 'chevron-button' | 'admin-button';
export type MangaProps = {
  manga: MangaType;
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

export async function Manga({ manga, trigger = 'artwork' }: MangaProps) {
  const { id, title, mangadex_id, latest_chapter = '0', description } = manga;
  const { supabase } = await createServerClient();
  const data = await getData(supabase, id);

  const isInLibrary = data.is_in_library;

  if (trigger === 'chevron-button') {
    return (
      <Sheet key={mangadex_id}>
        <SheetTrigger asChild>
          <Button size="xs">
            Open
            <ChevronRight />
          </Button>
        </SheetTrigger>
        <MangaDrawer mangaDexId={mangadex_id} title={title} description={description}>
          <div className="mt-4">
            <MangaImage imageUrl={manga.image_url} title={manga.title} width={210} height={280} showAnimation={false} />
          </div>
          <div className="mt-4 grid gap-4 py-4">
            <OpenMangaDexButton id={mangadex_id} className="w-full"></OpenMangaDexButton>
            <AddMangaToUserLibraryButton mangaId={manga.id} isInLibrary={isInLibrary} />
            {isInLibrary && <FollowMangaButton mangaId={manga.id} isFollowing={data.is_following} />}
            {isInLibrary && <FavoriteMangaButton mangaId={manga.id} isFavorite={data.is_favorite} />}
            {isInLibrary && (
              <UpdateProgressForm
                latestChapterRead={data.latest_chapter_read ?? '0'}
                readingStatus={data.reading_status ?? 'want to read'}
                latestChapter={manga.latest_chapter ?? '0'}
                priority={data.priority ?? 'normal'}
                mangaId={manga.id}
              />
            )}
          </div>
        </MangaDrawer>
      </Sheet>
    );
  }

  if (trigger === 'artwork') {
    const chaptersBehind = Number(latest_chapter ?? 0) - Number(data.latest_chapter_read ?? 0);

    return (
      <Sheet key={mangadex_id}>
        <MangaArtwork manga={manga} className="w-[250px]" width={250} height={330} chaptersBehind={chaptersBehind} />
        <MangaDrawer mangaDexId={mangadex_id} title={title} description={description}>
          <div className="mt-4">
            <MangaImage imageUrl={manga.image_url} title={manga.title} width={210} height={280} showAnimation={false} />
          </div>
          <div className="mt-4 grid gap-4 py-4">
            <OpenMangaDexButton id={mangadex_id} className="w-full"></OpenMangaDexButton>
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
              />
            )}
          </div>
        </MangaDrawer>
      </Sheet>
    );
  }

  if (trigger === 'admin-button') {
    return (
      <Sheet key={mangadex_id}>
        <SheetTrigger asChild>
          <Button size="xs">
            Open
            <ChevronRight />
          </Button>
        </SheetTrigger>
        <MangaDrawer mangaDexId={mangadex_id} title={title} description={description}>
          <div className="mt-4">
            <MangaImage imageUrl={manga.image_url} title={manga.title} width={210} height={280} showAnimation={false} />
          </div>
          <div className="mt-4 grid gap-4 py-4">
            <RemoveMangaFromDatabaseButton mangaId={manga.id} />
            <EditMangaAttributesDialog data={manga} />
          </div>
        </MangaDrawer>
      </Sheet>
    );
  }
}
