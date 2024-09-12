import { Manga } from '@lib/manga';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Manga · Manga Aggregator',
};

type AllMangaBrowseProps = {
  searchParams: { filter: string };
};

export default async function AllMangaBrowsePage({ searchParams }: AllMangaBrowseProps) {
  const { supabase } = await createServerClient();
  const { filter } = searchParams;
  const {
    data: mangas,
    error,
    count,
  } = await supabase.from('manga').select('*', { count: 'exact' }).ilike('title', `%${filter}%`);

  if (error) {
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden">
      {count === 0 ? (
        <NoMangaPlaceholder
          description="If you want some, you can go directly to MangaDex to browse there and add it to our database."
          showAllAvailableMangaLink={false}
        />
      ) : (
        <div className="mt-8 flex flex-wrap gap-4 overflow-auto pb-4 shadow-slate-400">
          {mangas.map(manga => (
            <Manga key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}
