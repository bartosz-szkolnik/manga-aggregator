'use client';

import { ReactNode } from 'react';
import { cn } from '@utils/utils';

type NavigationSubMenuProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
};

export function NavigationSubMenu({ children, className, open }: NavigationSubMenuProps) {
  return (
    <ul className={cn('grid duration-300 ease-in-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]', className)}>
      <div className="overflow-hidden pl-8">{children}</div>
    </ul>
  );
}
