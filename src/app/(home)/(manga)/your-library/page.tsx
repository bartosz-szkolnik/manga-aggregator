import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { Manga, MangaContainer } from '@lib/manga';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { unauthorized } from '@utils/auth';
import { getTheCtrlSymbol, getTheMetaSymbol } from '@utils/common';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'In Your Library · Manga Aggregator',
};

export default async function InYourLibraryPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
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
    <div className="max-h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Your Library</h2>
          <p className="text-sm text-muted-foreground">All of your Mangas in one place. You can browse them here.</p>
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()}/{getTheCtrlSymbol()} button pressed, you can open any of them
              directly on MangaDex.
            </strong>
          </p>
        </div>
        <div className="mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
        </div>
      </div>
      <Separator className="my-4" />
      {count === 0 ? (
        <NoMangaPlaceholder showYourLibraryLink={false} />
      ) : (
        <MangaContainer>
          {mangas.map(manga => (
            <Manga key={manga.id} manga={manga} />
          ))}
        </MangaContainer>
      )}
    </div>
  );
}
