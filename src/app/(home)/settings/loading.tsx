import { Skeleton } from '@components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <>
      <Skeleton className="m-4 h-6 w-[600px]" />
      <Skeleton className="m-4 h-6 w-[600px]" />
    </>
  );
}
