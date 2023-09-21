'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type LinkProps = NextLinkProps & {
  className?: string;
  activeClassName?: string;
};

export function Link({
  children,
  activeClassName = 'active-link bg-accent text-accent-foreground',
  className,
  ...props
}: PropsWithChildren<LinkProps>) {
  const currentPathname = usePathname();
  const linkPathname = new URL((props.as || props.href) as string, location.href).pathname;

  return (
    <NextLink
      className={linkPathname === currentPathname ? `${className} ${activeClassName}`.trim() : className}
      {...props}
    >
      {children}
    </NextLink>
  );
}
