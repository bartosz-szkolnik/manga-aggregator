import { Navigation } from './navigation';
import { SidebarRoot, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem } from '@components/ui/sidebar';
import { SidebarIcons } from './sidebar-icons';
import { Footer } from '@components/footer/footer';
import { Separator } from '@components/ui/separator';
import { cookies } from 'next/headers';
import { SidebarContents } from './sidebar-content';

type SidebarProps = {
  className?: string;
};

export async function Sidebar({ className }: SidebarProps) {
  const cookieValues = await cookies();
  const defaultColor = cookieValues.get('color')?.value ?? 'zinc';

  return (
    <SidebarRoot className={className}>
      <SidebarHeader className="mx-4">
        <SidebarIcons defaultColor={defaultColor} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarContents />
        </SidebarItem>
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
