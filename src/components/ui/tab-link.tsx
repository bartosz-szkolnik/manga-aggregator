import { cn } from '@utils/utils';
import { Link, LinkProps } from './link';
import { ReactNode } from 'react';

const linkStyles =
  'text-md inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export function TabLink({ className, disabled = false, ...props }: LinkProps & { disabled?: boolean }) {
  if (disabled) {
    return <span className={cn('cursor-default opacity-50', linkStyles, className)} {...props} />;
  }

  return (
    <Link className={cn(linkStyles, className)} activeClassName="bg-background text-foreground shadow-sm" {...props} />
  );
}

const linkContainerStyles =
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground';

export function TabLinkContainer({ className, children }: { className?: string; children: ReactNode }) {
  return <nav className={cn(linkContainerStyles, className)}>{children}</nav>;
}
