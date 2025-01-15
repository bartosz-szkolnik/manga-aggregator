import { Statistic } from '@components/statistics/statistic';
import { ScrollArea, ScrollBar } from '@components/common/scroll-area';
import { Separator } from '@components/ui/separator';
import { fetchRecommendedMangas, fetchMangasReadCount, fetchMangasPlannedToReadCount } from '@home/lib/data';
import { MangaPortrait } from '@manga/components/artwork';
import { verifyAccess } from '@auth/utils';
import { logger } from '@utils/server/logger';
import { Book, BookCheck } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Home' };

export default async function HomePage() {
  const { data, error, profile } = await fetchRecommendedMangas();

  if (error) {
    // TODO: Make better errors
    logger.error(error);
    return <p>Some kind of error occured</p>;
  }

  return (
    <main className="overflow-hidden px-4 py-4 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        {verifyAccess(profile).includes('read-own') && <Statistics />}
      </Suspense>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
          <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative">
        <ScrollArea>
          <div className="flex snap-x snap-mandatory space-x-4 pb-4">
            {data.map(manga => (
              <div key={manga.id} className="snap-start">
                <figure className="w-[250px] shrink-0">
                  <MangaPortrait imageUrl={manga.imageUrl} title={manga.title} showAnimation />
                  <figcaption className="break space-y-1 pt-2 text-muted-foreground">
                    {/* <span className="font-semibold text-foreground">{manga.title}</span> */}
                    <h3 className="text-center text-base font-medium leading-none">{manga.title}</h3>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
}

async function Statistics() {
  const [mangasRead, mangasPlannedToRead] = await Promise.all([
    fetchMangasReadCount(),
    fetchMangasPlannedToReadCount(),
  ]);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Statistic title="Mangas read" icon={BookCheck}>
        <div className="text-2xl font-bold">{mangasRead}</div>
        <p className="text-xs text-muted-foreground">Good job and keep going!</p>
      </Statistic>
      <Statistic title="Mangas planned to read" icon={Book}>
        <div className="text-2xl font-bold">{mangasPlannedToRead}</div>
        <p className="text-xs text-muted-foreground">We know you can get there if you put your head to it!</p>
      </Statistic>
    </div>
  );
}
