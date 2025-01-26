'use client';

import { ReactNode } from 'react';
import { Link } from '@components/ui/link';
import { cn } from '@utils/utils';
import { useIsMobile } from '@utils/hooks';
import { useSidebar } from '@components/ui/sidebar';
import NextLink from 'next/link';

export type NavigationLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  condition?: boolean;
  disabled?: boolean;
  match?: string[];
  usePlainNextLink?: boolean;
};

export function NavigationLink({
  className,
  children,
  condition = true,
  usePlainNextLink = false,
  ...props
}: NavigationLinkProps) {
  const isMobile = useIsMobile();
  const { setOpen } = useSidebar();

  function handleClick() {
    if (isMobile) {
      setOpen(false);
    }
  }

  if (!condition) {
    return null;
  }

  if (usePlainNextLink) {
    return (
      <NextLink onClick={handleClick} href={props.href} className={className}>
        {children}
      </NextLink>
    );
  }

  return (
    <Link
      onClick={handleClick}
      {...props}
      className={cn('flex w-full items-center rounded-lg border-none bg-none p-[0.85rem] text-left', className)}
    >
      {children}
    </Link>
  );
}
