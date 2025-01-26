import { Skeleton } from '@components/ui/skeleton';

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

export function MangasSkeleton() {
  return Array(10)
    .fill(null)
    .map((_, i) => <MangaResponsiveSkeleton key={i} />);
}

export function MangaGridSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 pb-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      <MangasSkeleton />
    </div>
  );
}
