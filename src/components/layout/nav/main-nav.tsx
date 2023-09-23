import { cn } from '@/src/lib/utils';
import { HTMLAttributes } from 'react';
import { Link } from '../../ui/link';

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link href="/home" className="text-sm font-medium transition-colors hover:text-primary px-4 py-2" hasNestedRoutes>
        Home
      </Link>
      <Link href="/all-mangas" className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
        All mangas
      </Link>
      {/* <Link href="/" className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
        Products
      </Link> */}
      <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary px-4 py-2">
        Settings
      </Link>
    </div>
  );
}
