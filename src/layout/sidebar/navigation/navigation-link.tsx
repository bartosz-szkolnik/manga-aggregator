import { ReactNode } from 'react';
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
    <Link
      {...props}
      className={cn('flex w-full items-center rounded-lg border-none bg-none p-[0.85rem] text-left', className)}
    >
      {children}
    </Link>
  );
}
