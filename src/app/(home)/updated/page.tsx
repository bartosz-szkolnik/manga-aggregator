import { Separator } from '@components/ui/separator';
import { Manga } from '@lib/manga/manga';
import { createServerClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function UpdatedForYou() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return redirect('./auth/sign-in');
  }

  const { data, error } = await supabase.from('profile_manga').select('manga(*)').eq('profile_id', userId!);

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
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()} button pressed, you can open any of them directly on MangaDex.
            </strong>
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <div className="flex flex-wrap space-x-4 pb-4">
          {mangas.map(manga => (
            <Manga key={manga.id} manga={manga} />
          ))}
        </div>
      </div>
    </>
  );
}

function getTheMetaSymbol() {
  return (
    <span className="text-sm text-muted-foreground">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
      </kbd>
    </span>
  );
}