'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { cn } from '@utils/utils';

export type LinkProps = NextLinkProps & {
  className?: string;
  activeClassName?: string;
  match?: string[];
  children: ReactNode;
};

export function Link({
  children,
  activeClassName = 'active-link bg-accent text-accent-foreground',
  className = '',
  match,
  ...props
}: LinkProps) {
  const pathname = usePathname();

  return (
    <NextLink
      className={cn({
        [className]: true,
        [activeClassName]: match ? match.includes(pathname) : pathname.startsWith(props.href.toString()),
      })}
      {...props}
    >
      {children}
    </NextLink>
  );
}
