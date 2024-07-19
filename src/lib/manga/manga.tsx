import { Sheet } from '@components/ui/sheet';
import { MangaArtwork } from './manga-artwork';
import { Manga as MangaType } from '@lib/types/manga.types';
import { MangaDrawer } from './manga-drawer';
import { FollowMangaButton } from '@lib/follow-manga/follow-manga-button';
import { createServerClient } from '@utils/supabase/server';
import { Button } from '@components/ui/button';

export type MangaProps = {
  manga: MangaType;
};

export async function Manga({ manga }: MangaProps) {
  const { id, title, mangadex_id, latest_chapter = '0' } = manga;
  const { supabase } = await createServerClient();
  const { data, error } = await supabase
    .from('profile_manga')
    .select('is_following, latest_chapter_read')
    .eq('manga_id', id)
    .single();

  if (error) {
    return <Button disabled>Following unavailable right now</Button>;
  }

  const chaptersBehind = Number(latest_chapter ?? 0) - Number(data.latest_chapter_read ?? 0);
  return (
    <Sheet>
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
          <FollowMangaButton mangaId={manga.id} isFollowing={data?.is_following} />
        </div>
      </MangaDrawer>
    </Sheet>
  );
}
