'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { cn } from '@utils/utils';

export type LinkProps = NextLinkProps & {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  disabled?: boolean;
  match?: string[];
  target?: string;
  rel?: string;
};

export function Link({
  children,
  activeClassName = 'active-link bg-gradient-from-active text-accent-foreground',
  className = '',
  href,
  disabled = false,
  match,
  ...props
}: LinkProps) {
  const pathname = usePathname();

  if (disabled) {
    return (
      <span className={cn('text-muted-foreground', className, 'hover:bg-transparent hover:text-muted-foreground')}>
        {children}
      </span>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn({ [className]: true, [activeClassName]: isActive(pathname, href.toString(), match) })}
      {...props}
    >
      {children}
    </NextLink>
  );
}

function isActive(pathname: string, href: string, match?: string[]) {
  if (href === '/') {
    return pathname === '/' || match?.some(href => pathname.includes(href));
  }

  const [first] = href.split('?');
  return pathname.startsWith(first);
}
