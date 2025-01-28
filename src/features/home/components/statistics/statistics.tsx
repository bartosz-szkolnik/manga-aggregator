import { CardsSkeleton } from '@components/skeletons';
import { Statistic } from '@components/statistics';
import { Button } from '@components/ui/button';
import { AnimatedCollapsibleContent, Collapsible, CollapsibleTrigger } from '@components/ui/collapsible';
import { Separator } from '@components/ui/separator';
import { fetchMangasPlannedToReadCount, fetchMangasReadCount } from '@home/lib/statistics/data';
import { Book, BookCheck, ChevronsUpDown } from 'lucide-react';
import { Suspense } from 'react';

type StatisticsContainerProps = {
  mangasRead: number;
  mangasPlannedToRead: number;
};

export function Statistics() {
  return (
    <Suspense fallback={<CardsSkeleton />}>
      <StatisticsContainer />
    </Suspense>
  );
}

async function StatisticsContainer() {
  const [mangasRead, mangasPlannedToRead] = await Promise.all([
    fetchMangasReadCount(),
    fetchMangasPlannedToReadCount(),
  ]);

  const data = { mangasPlannedToRead: mangasPlannedToRead ?? 0, mangasRead: mangasRead ?? 0 };
  return (
    <>
      <Collapsible className="block py-4 md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="h-12 w-full text-ellipsis px-2 md:h-10">
            <ChevronsUpDown className="h-4 w-4" />
            Show me my statistics...
          </Button>
        </CollapsibleTrigger>
        <AnimatedCollapsibleContent className="pt-2">
          <StatisticsInformation {...data} />
        </AnimatedCollapsibleContent>
      </Collapsible>
      <div className="hidden md:block">
        <StatisticsInformation {...data} />
        <Separator className="my-4" />
      </div>
    </>
  );
}

function StatisticsInformation({ mangasPlannedToRead, mangasRead }: StatisticsContainerProps) {
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
