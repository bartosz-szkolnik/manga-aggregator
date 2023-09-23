'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { cn } from '@/src/lib/utils';

type LinkProps = NextLinkProps & {
  className?: string;
  activeClassName?: string;
  hasNestedRoutes?: boolean;
};

export function Link({
  children,
  activeClassName = 'active-link bg-accent text-accent-foreground',
  className = '',
  hasNestedRoutes = false,
  ...props
}: PropsWithChildren<LinkProps>) {
  const pathname = usePathname();

  return (
    <NextLink
      className={cn({
        [className]: true,
        [activeClassName]: hasNestedRoutes ? pathname.includes(props.href.toString()) : props.href === pathname,
      })}
      {...props}
    >
      {children}
    </NextLink>
  );
}
