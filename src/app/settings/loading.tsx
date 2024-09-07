import { Skeleton } from '@components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <>
      <Skeleton className="m-4 h-6 w-[600px]" />
      <Skeleton className="m-4 h-6 w-[600px]" />
      {/* TODO: fix the height issue */}
      <div className="mx-4 flex max-h-[85%] flex-wrap items-center gap-4 overflow-hidden">
        {Array.from({ length: 50 })
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
    </>
  );
}
