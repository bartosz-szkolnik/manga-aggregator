import { Navigation } from './navigation';
import { SidebarRoot, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem } from '@components/ui/sidebar';
import { SidebarIcons } from './sidebar-icons';
import { Footer } from '@components/footer/footer';
import { Separator } from '@components/ui/separator';
import { SidebarContents } from './sidebar-contents';
import { fetchSidebarData } from './data';

type SidebarProps = {
  className?: string;
  defaultColor: string;
};

export async function Sidebar({ className, defaultColor }: SidebarProps) {
  const { profile, error, user, userId } = await fetchSidebarData();

  if (error) {
    return <p>Some kind of error occured.</p>;
  }

  return (
    <SidebarRoot className={className}>
      <SidebarHeader className="mx-4">
        <SidebarIcons defaultColor={defaultColor} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarContents profile={profile} user={user} />
        </SidebarItem>
        <div className="mx-2">
          <Separator dir="horizontal" className="bg-slate-400" />
        </div>
        <SidebarItem>
          <Navigation profile={profile} userId={userId} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </SidebarRoot>
  );
}
