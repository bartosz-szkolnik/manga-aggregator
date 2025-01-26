import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex w-full justify-between">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-6 w-5 rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Skeleton className="h-6 w-10 rounded-md" />
        <Skeleton className="h-5 w-40 rounded-md" />
      </CardContent>
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <Separator className="my-4" />
    </>
  );
}
