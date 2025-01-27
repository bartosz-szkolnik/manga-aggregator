import { Skeleton } from '@components/ui/skeleton';
import { clamp } from '@utils/utils';

export function MangaResponsiveSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[4/5] min-h-[275px] min-w-[125px] max-w-[550px] md:min-h-[330px] md:max-w-[515px] lg:max-w-[350px]" />
      <div className="mt-1 flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export function MangasInRowSkeleton({ total, fetchedAmount }: { total: number; fetchedAmount: number }) {
  const amount = clamp(total - fetchedAmount, 0, 10);
  return createArray(amount, (_, i) => <MangaResponsiveSkeleton key={i} />);
}

export function MangaGridSkeleton({ total = 10 }: { total?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 pb-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {createArray(total, (_, i) => (
        <MangaResponsiveSkeleton key={i} />
      ))}
    </div>
  );
}

function createArray<T>(total: number, callback: (el: unknown, index: number) => T) {
  return Array(total).fill(null).map(callback);
}
