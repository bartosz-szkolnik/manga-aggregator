import { Separator } from '@components/ui/separator';
import { Manga, MangaContainer } from '@lib/manga';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { OpenAllButton } from './open-all-button';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { Metadata } from 'next';
import { getTheCtrlSymbol, getTheMetaSymbol } from '@utils/common';
import { unauthorized } from '@utils/auth';

export const metadata: Metadata = {
  title: 'Updated · Manga Aggregator',
};

export default async function UpdatedForYouPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error, count } = await supabase
    .from('profile_manga')
    .select('manga(*)', { count: 'exact' })
    .match({ profile_id: userId, is_updated: true });

  if (error) {
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  const mangas = data.flatMap(({ manga }) => (manga ? [manga] : []));
  const mangaIds = mangas.map(manga => manga.mangadex_id);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Updated for You</h2>
          <p className="text-sm text-muted-foreground">Recently updated mangas you follow. You can read them here.</p>
          <p className="mt-16">
            <strong className="text-sm text-muted-foreground">
              If you click with the {getTheMetaSymbol()}/{getTheCtrlSymbol()} button pressed, you can open any of them
              directly on MangaDex.
            </strong>
          </p>
        </div>
        <div className="space-between mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
          <OpenAllButton mangaIds={mangaIds} />
        </div>
      </div>
      <Separator className="my-4" />
      {count === 0 ? (
        <NoMangaPlaceholder text="You are all caught up! Good job!" />
      ) : (
        <MangaContainer>
          {mangas.map(manga => (
            <Manga key={manga.id} manga={manga} />
          ))}
        </MangaContainer>
      )}
    </>
  );
}
