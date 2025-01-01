import { SidebarLayout, SidebarTrigger } from '@components/ui/sidebar';
import { Sidebar } from '@layout/sidebar';
import { Breadcrumbs } from '@lib/breadcrumbs';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const cookieValues = await cookies();

  const sidebarState = cookieValues.get('sidebar:state');
  const defaultColor = cookieValues.get('color')?.value ?? 'zinc';
  const defaultOpen = sidebarState !== undefined ? sidebarState.value === 'true' : true;

  return (
    <div className="flex max-h-screen md:bg-gradient-to-r md:from-gradient-from md:to-gradient-to">
      <SidebarLayout defaultOpen={defaultOpen}>
        <Sidebar className="px-2 py-6" defaultColor={defaultColor} />
        <main className="grid max-h-screen w-full grid-rows-[auto_1fr] rounded-md bg-background shadow-lg shadow-slate-400 dark:shadow-none md:m-3">
          <div className="ml-4 mt-4 flex">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </SidebarLayout>
    </div>
  );
}
