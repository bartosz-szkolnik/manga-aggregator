import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';

export function SimpleLayoutSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <Skeleton className="m-2 h-6 w-[100%-16px]" />
        <Skeleton className="m-2 h-4 w-[100%-16px]" />
      </div>
      <Separator className="my-4" />
      <div>
        <Skeleton className="m-2 h-6 w-[100%-16px]" />
        <Skeleton className="m-2 h-4 w-[100%-16px]" />
      </div>
    </div>
  );
}
