import { cn } from '@utils/utils';
import { HTMLAttributes } from 'react';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-slate-100 dark:bg-muted', className)} {...props} />;
}

export { Skeleton };
