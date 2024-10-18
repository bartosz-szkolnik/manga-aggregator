'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@utils/utils';
import { ChevronDown } from 'lucide-react';
import { NavigationSubMenu } from './navigation-sub-menu';
import { usePathname } from 'next/navigation';

type DropdownButtonProps = {
  children: ReactNode;
  className?: string;
  text: string;
  icon: ReactNode;
  defaultOpen?: boolean;
  match?: string[];
  href: string;
};

export function NavigationDropdownButton(props: DropdownButtonProps) {
  const pathname = usePathname();
  const { children, className, icon, text, defaultOpen = false, match, href } = props;
  const [open, setOpen] = useState(defaultOpen || isChildActive(pathname, href, match));

  function handleClick() {
    setOpen(open => !open);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'flex w-full items-center rounded-lg border-none bg-none p-[0.85rem] text-left font-medium ring-ring transition-all hover:bg-gradient-from-hover hover:text-accent-foreground focus-visible:ring-2',
          className,
        )}
      >
        {icon}
        <span className="grow">{text}</span>
        <ChevronDown className={cn('shrink-0 duration-200', open ? 'rotate-180' : '')} />
      </button>
      <NavigationSubMenu open={open}>{children}</NavigationSubMenu>
    </>
  );
}

function isChildActive(pathname: string, href: string, match?: string[]) {
  if (href === '/') {
    return pathname === '/' || Boolean(match?.some(href => pathname.includes(href)));
  }

  return pathname.startsWith(href);
}
