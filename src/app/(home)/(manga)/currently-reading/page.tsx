import { Separator } from '@components/ui/separator';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database';
import { Manga } from '@lib/manga';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { Manga as MangaType } from '@lib/types/manga.types';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { getTheMetaSymbol } from '@utils/common';
import { Metadata } from 'next';
import { unauthorized } from '@utils/auth';

export const metadata: Metadata = {
  title: 'Next up · Manga Aggregator',
};

export default async function CurrentlyReadingPage() {
  const { supabase, userId } = await createServerClient();
  if (!userId) {
    return unauthorized();
  }

  const { data, error, count } = await supabase
    .from('profile_manga')
    .select('latest_chapter_read ,manga(*)', { count: 'exact' })
    .match({ profile_id: userId, reading_status: 'reading' });

  if (error) {
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  const mangas = data.toSorted(sort).flatMap(({ manga }) => (manga ? [manga] : []));
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
        <div className="mb-6 ml-2 flex items-center">
          <AddMangaToDatabaseDialog className="ml-auto mr-4" />
        </div>
      </div>
      <Separator className="my-4" />
      {count === 0 ? (
        <NoMangaPlaceholder text="You are all caught up! Good job!" />
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

type Sortable = { latest_chapter_read: string | null; manga: MangaType | null };
function sort(left: Sortable, right: Sortable) {
  const isLeftUpToDate = isUpToDate(left);
  const isRightUpToDate = isUpToDate(right);

  if (isLeftUpToDate && isRightUpToDate) {
    return 0;
  }

  if (isLeftUpToDate) {
    return 1;
  }

  if (isRightUpToDate) {
    return -1;
  }

  return 0;
}

function isUpToDate({ latest_chapter_read = '0', manga }: Sortable) {
  const latestChapterRead = Number(latest_chapter_read) ?? 0;
  const latestChapter = Number(manga?.latest_chapter) ?? 0;
  return latestChapterRead >= latestChapter;
}
