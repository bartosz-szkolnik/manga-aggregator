import { Separator } from '@components/ui/separator';
import { MangaArtwork } from '@lib/manga/manga-artwork';
import { createServerClient } from '@utils/supabase/server';

export async function UpdatedForYou() {
  const { supabase } = await createServerClient();
  const { data, error } = await supabase.from('profile_manga').select('manga(*)').eq('is_following', true);

  if (error) {
    return <p>Some kind of error occured</p>;
  }

  const mangas = data.flatMap(({ manga }) => (manga ? [manga] : []));
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Updated for You</h2>
          <p className="text-sm text-muted-foreground">Recently updated mangas you follow. You can read them here.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <div className="flex flex-wrap space-x-4 pb-4">
          {mangas.map(manga => (
            <MangaArtwork
              key={manga.id}
              manga={manga}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))}
        </div>
      </div>
    </>
  );
}