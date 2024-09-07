import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@utils/utils';
import { ServiceWorkerProvider } from '@lib/sending-notifications/service-worker-provider';
import { ReactNode } from 'react';
import { Toaster } from '@components/ui/toast';
import { SidebarLayout, SidebarTrigger } from '@components/ui/sidebar';
import { Breadcrumbs } from '@lib/breadcrumbs';
import { cookies } from 'next/headers';
import { Sidebar, SidebarContent } from '@layout/sidebar';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin-ext'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const defaultOpen = cookies().get('sidebar:state')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ServiceWorkerProvider>
          {/* TODO: enable after the colors have been properly aligned to dark mode */}
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          {/* </ThemeProvider> */}
          <div className="flex h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
            <SidebarLayout defaultOpen={defaultOpen}>
              <Sidebar className="px-2 py-6">
                <SidebarContent />
              </Sidebar>
              <div className="m-3 flex flex-1 flex-col rounded-md bg-white shadow-lg shadow-slate-400">
                <div className="ml-4 mt-4 flex">
                  <SidebarTrigger />
                  <Breadcrumbs />
                </div>
                <div className="flex-1">{children}</div>
              </div>
            </SidebarLayout>
          </div>
        </ServiceWorkerProvider>
        <Toaster />
      </body>
    </html>
  );
}
