import { Manga } from '@lib/manga';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder';
import { logger } from '@utils/server/logger';
import { createServerClient } from '@utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Manga · Manga Aggregator',
};

export default async function AllMangaBrowsePage() {
  const { supabase } = await createServerClient();
  const { data: mangas, error, count } = await supabase.from('manga').select('*', { count: 'exact' });

  if (error) {
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return count === 0 ? (
    <NoMangaPlaceholder description="If you want some, you can go directly to MangaDex to browse there and add it to our database." />
  ) : (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-wrap gap-4 pb-4">
        {mangas.map(manga => (
          <Manga key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}
