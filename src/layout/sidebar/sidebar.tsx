import { Navigation } from './navigation';
import { SidebarRoot, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem } from '@components/ui/sidebar';
import { SidebarIcons } from './sidebar-icons';
import { ReactNode } from 'react';
import { Footer } from '@components/footer/footer';
import { Separator } from '@components/ui/separator';
import { cookies } from 'next/headers';

type SidebarProps = {
  children: ReactNode;
  className?: string;
};

export function Sidebar({ children, className }: SidebarProps) {
  const defaultColor = cookies().get('color')?.value ?? 'zinc';

  return (
    <SidebarRoot className={className}>
      <SidebarHeader className="mx-4">
        <SidebarIcons defaultColor={defaultColor} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>{children}</SidebarItem>
        <div className="mx-2">
          <Separator dir="horizontal" className="bg-slate-400" />
        </div>
        <SidebarItem>
          <Navigation />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </SidebarRoot>
  );
}
