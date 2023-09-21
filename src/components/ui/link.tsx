'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { cn } from '@/src/lib/utils';

type LinkProps = NextLinkProps & {
  className?: string;
  activeClassName?: string;
};

export function Link({
  children,
  activeClassName = 'active-link bg-accent text-accent-foreground',
  className = '',
  ...props
}: PropsWithChildren<LinkProps>) {
  const pathname = usePathname();

  return (
    <NextLink
      className={cn({
        [className]: true,
        [activeClassName]: props.href === pathname,
      })}
      {...props}
    >
      {children}
    </NextLink>
  );
}
