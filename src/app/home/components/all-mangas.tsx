import { Separator } from '@components/ui/separator';
import { MangaArtwork } from '@lib/manga/manga-artwork';
import { createServerClient } from '@utils/supabase/server';

export async function AllMangas() {
  const { supabase } = await createServerClient();
  const { data, error } = await supabase.from('manga').select('*');

  if (error) {
    return <p>Some kind of error occured</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">All available Manga</h1>
          <p className="text-sm text-muted-foreground">You can...</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <div className="flex flex-wrap space-x-4 pb-4">
          {data.map(manga => (
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
