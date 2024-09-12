import { Skeleton } from '@components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="m-4 h-6 w-[600px]" />
      <Skeleton className="m-4 h-6 w-[600px]" />
      <div className="mx-4 flex flex-wrap items-center gap-4 overflow-hidden">
        {Array.from({ length: 10 })
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-[280px] w-[200px] rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
