import { Separator } from '@components/ui/separator';
import { Manga } from '@lib/manga/manga';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder/no-mangas-placeholder';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function InYourLibraryPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return redirect('./auth/sign-in');
  }

  const { data, error, count } = await supabase
    .from('profile_manga')
    .select('manga(*)', { count: 'exact' })
    .match({ profile_id: userId, is_in_library: true });

  if (error) {
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  const mangas = data.flatMap(({ manga }) => (manga ? [manga] : []));
  return (
    <div className="flex max-h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Currectly Reading Mangas</h2>
          <p className="text-sm text-muted-foreground">Currently reading mangas. You can read them here.</p>
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()} button pressed, you can open any of them directly on MangaDex.
            </strong>
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      {count === 0 ? (
        <NoMangaPlaceholder />
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="flex flex-wrap gap-4 pb-4">
            {mangas.map(manga => (
              <Manga key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      )}
    </div>
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
