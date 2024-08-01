'use client';

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { cn } from '@utils/utils';
import { Footer } from '@components/footer/footer';
import { Separator } from '@components/ui/separator';
import { SidebarIcons } from './sidebar-icons';

import './sidebar.styles.css';

type SidebarProps = HTMLAttributes<HTMLDivElement> & {
  links: ReactNode[];
};

export function Sidebar({ className, links, children }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <aside>
      <CSSTransition nodeRef={ref} in={open} timeout={200} classNames="sidebar" unmountOnExit>
        <div ref={ref}>
          <div className={cn('flex h-full w-full flex-col space-y-4 py-4 pb-12', className)}>
            <div className="flex-1">
              <SidebarIcons setSidebarOpen={() => setOpen(false)} />
              {children}
              <Separator dir="horizontal" className="my-4 bg-slate-400" />
              <nav>{links}</nav>
            </div>
            <Footer />
          </div>
        </div>
      </CSSTransition>
    </aside>
  );
}
