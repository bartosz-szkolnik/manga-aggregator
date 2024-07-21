import { Sheet } from '@components/ui/sheet';
import { MangaArtwork } from './manga-artwork';
import { Manga as MangaType } from '@lib/types/manga.types';
import { MangaDrawer } from './manga-drawer';
import { FollowMangaButton } from '@lib/follow-manga/follow-manga-button';
import { createServerClient } from '@utils/supabase/server';
import { Button } from '@components/ui/button';
import { UpdateProgressForm } from '@lib/update-progress/update-progress-form';
import { AddMangaToLibraryButton } from '@lib/add-manga-to-library/add-manga-to-library-button';

export type MangaProps = {
  manga: MangaType;
};

export async function Manga({ manga }: MangaProps) {
  const { id, title, mangadex_id, latest_chapter = '0' } = manga;
  const { supabase } = await createServerClient();
  const { data, error } = await supabase
    .from('profile_manga')
    .select('is_following, latest_chapter_read, current_reading_status, priority, is_in_library')
    .eq('manga_id', id)
    .single();

  if (error) {
    return <Button disabled>Following unavailable right now</Button>;
  }

  const chaptersBehind = Number(latest_chapter ?? 0) - Number(data.latest_chapter_read ?? 0);
  return (
    <Sheet key={mangadex_id}>
      <MangaArtwork
        manga={manga}
        className="w-[250px]"
        aspectRatio="portrait"
        width={250}
        height={330}
        chaptersBehind={chaptersBehind}
      />
      <MangaDrawer mangaDexId={mangadex_id} title={title}>
        <div className="mt-4 grid gap-4 py-4">
          <AddMangaToLibraryButton mangaId={manga.id} isInLibrary={data.is_in_library} />
          <FollowMangaButton mangaId={manga.id} isFollowing={data?.is_following} />
          <UpdateProgressForm
            latestChapterRead={data.latest_chapter_read ?? '0'}
            currentReadingStatus={data.current_reading_status ?? 'want to read'}
            latestChapter={manga.latest_chapter ?? '0'}
            priority={data.priority ?? 'normal'}
            mangaId={manga.id}
          />
        </div>
      </MangaDrawer>
    </Sheet>
  );
}
