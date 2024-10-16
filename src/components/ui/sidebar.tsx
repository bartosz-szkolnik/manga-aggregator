'use client';

import { ChevronsRight } from 'lucide-react';
import { cn } from '@utils/utils';
import { Button } from './button';
import { Sheet, SheetContent } from './sheet';
import { useIsMobile } from '@utils/hooks/is-mobile';
import { saveToCookies } from '@utils/cookies';
import {
  ComponentProps,
  createContext,
  CSSProperties,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type SidebarContext = {
  state: 'open' | 'closed';
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContext>({
  state: 'open',
  open: true,
  setOpen: () => {},
});

export const SIDEBAR_STATE_COOKIE = 'sidebar:state';

const SidebarLayout = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    defaultOpen?: boolean;
  }
>(({ defaultOpen, className, ...props }, ref) => {
  const [open, setOpen] = useState(defaultOpen ?? true);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    saveToCookies(SIDEBAR_STATE_COOKIE, String(open));
  }, []);

  const state = open ? 'open' : 'closed';
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  return (
    <SidebarContext.Provider value={{ state, open, setOpen: onOpenChange }}>
      <div
        ref={ref}
        data-sidebar={state}
        style={{ '--sidebar-width': '20rem' } as CSSProperties}
        className={cn(
          'flex min-h-screen w-full pl-0 transition-all duration-300 ease-in-out data-[sidebar=closed]:pl-0 sm:pl-[--sidebar-width]',
          className,
        )}
        {...props}
      />
    </SidebarContext.Provider>
  );
});
SidebarLayout.displayName = 'SidebarLayout';

const SidebarTrigger = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(({ className, ...props }, ref) => {
  const { open, setOpen } = useSidebar();

  if (open) {
    return;
  }

  return (
    <Button ref={ref} variant="ghost" size="icon" className={className} onClick={() => setOpen(!open)} {...props}>
      <ChevronsRight></ChevronsRight>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarRoot = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, children }, ref) => {
  const isMobile = useIsMobile();
  const { open, setOpen: onOpenChange } = useSidebar();

  const sidebar = (
    <div ref={ref} className={cn('flex h-full flex-col', className)}>
      {children}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full p-0 md:w-[--sidebar-width] [&>button]:hidden" side="left">
          {sidebar}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[--sidebar-width] transition-all duration-300 ease-in-out md:block [[data-sidebar=closed]_&]:left-[calc(var(--sidebar-width)*-1)]">
      {sidebar}
    </aside>
  );
});
SidebarRoot.displayName = 'Sidebar';

const SidebarHeader = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('mb-4 flex items-center justify-between', className)} {...props} />;
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex items-center px-2.5 py-2', className)} {...props} />;
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex flex-1 flex-col gap-5 overflow-auto', className)} {...props} />;
});
SidebarContent.displayName = 'SidebarContent';

const SidebarItem = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('grid gap-2 px-2.5', className)} {...props} />;
});
SidebarItem.displayName = 'SidebarItem';

const SidebarLabel = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('px-1.5 font-medium text-muted-foreground', className)} {...props} />;
});
SidebarLabel.displayName = 'SidebarLabel';

export {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
};

function useSidebar() {
  return useContext(SidebarContext);
}
