import { Skeleton } from '@components/ui/skeleton';
import { MangaGridSkeleton } from './manga';
import { MangaTableSkeleton } from './table';

export function QueryTabsSkeleton({ tab }: { tab: 'grid' | 'table' }) {
  return (
    <>
      <div className="mt-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-col justify-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-10 w-[500px]" />
        </div>
      </div>
      {tab === 'grid' ? <MangaGridSkeleton /> : <MangaTableSkeleton />}
    </>
  );
}
