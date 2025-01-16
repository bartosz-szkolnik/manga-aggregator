'use client';
import { Button } from '@components/ui/button';
import { cn } from '@utils/utils';

type ErrorProps = {
  back?: () => void;
  className?: string;
};

export function Error({ back, className }: ErrorProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <h2 className="text-center">Something went wrong!</h2>
      <div className="flex gap-4">
        {back && <Button onClick={() => back()}>Go back</Button>}
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    </div>
  );
}
