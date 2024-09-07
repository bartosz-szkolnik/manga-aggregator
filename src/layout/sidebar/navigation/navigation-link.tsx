import { ReactNode } from 'react';
import { buttonVariants } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { cn } from '@utils/utils';

export type NavigationLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  condition?: boolean;
  disabled?: boolean;
  match?: string[];
};

export function NavigationLink({ className, children, condition = true, ...props }: NavigationLinkProps) {
  if (!condition) {
    return null;
  }

  return (
    <Link {...props} className={buttonVariants({ variant: 'ghost', className: cn('w-full justify-start', className) })}>
      {children}
    </Link>
  );
}
