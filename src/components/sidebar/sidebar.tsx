'use client';

import { Button } from '@components/ui/button';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { cn } from '@utils/utils';
import { PanelLeftDashed } from 'lucide-react';
import { Footer } from '@components/footer/footer';

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
    <>
      <CSSTransition nodeRef={ref} in={open} timeout={200} classNames="sidebar" unmountOnExit>
        <div ref={ref}>
          <div className={cn('flex h-full w-full flex-col space-y-4 py-4 pb-12', className)}>
            <div className="flex-1">
              <Button variant={'ghost'} onClick={() => setOpen(false)}>
                <PanelLeftDashed></PanelLeftDashed>
              </Button>
              {children}

              <nav>{links}</nav>
            </div>
            <Footer />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
