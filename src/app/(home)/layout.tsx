import { SidebarLayout, SidebarTrigger } from '@components/ui/sidebar';
import { fetchProfile } from '@home/lib/data';
import { Sidebar } from '@layout/sidebar';
import { Breadcrumbs } from '@lib/breadcrumbs';
import { HelperDialog } from '@lib/helper-dialog';
import { AddMangaViaShortcut } from '@manga/components/common/add-manga-via-shortcut';
import { verifyAccess } from '@utils/auth';
import { cookies } from 'next/headers';
import { ReactNode, Suspense } from 'react';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const cookie = await cookies();

  const sidebarState = cookie.get('sidebar:state');
  const defaultColor = cookie.get('color')?.value ?? 'zinc';
  const defaultOpen = sidebarState !== undefined ? sidebarState.value === 'true' : true;
  const helperModalOpenedPreviously = cookie.get('helper-modal')?.value === 'true';

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
      <HelperDialog defaultOpen={!helperModalOpenedPreviously} />
      <Suspense fallback={<div />}>
        <AddMangaViaShortcutContainer />
      </Suspense>
    </div>
  );
}

async function AddMangaViaShortcutContainer() {
  const { profile } = await fetchProfile();
  return <div>{verifyAccess(profile).includes('add') && <AddMangaViaShortcut />}</div>;
}
