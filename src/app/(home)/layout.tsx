import { SidebarLayout, SidebarTrigger } from '@components/ui/sidebar';
import { Sidebar, SidebarContents } from '@layout/sidebar';
import { Breadcrumbs } from '@lib/breadcrumbs';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const cookie = cookies().get('sidebar:state');
  const defaultOpen = cookie !== undefined ? cookie.value === 'true' : true;

  return (
    <SidebarLayout defaultOpen={defaultOpen}>
      <Sidebar className="px-2 py-6">
        <SidebarContents />
      </Sidebar>
      <main className="m-3 grid max-h-screen w-full grid-rows-[auto_1fr] rounded-md bg-background shadow-lg shadow-slate-400 dark:shadow-none">
        <div className="ml-4 mt-4 flex">
          <SidebarTrigger />
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </SidebarLayout>
  );
}
