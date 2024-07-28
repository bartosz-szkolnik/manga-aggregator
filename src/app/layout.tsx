import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@utils/utils';
import { ServiceWorkerProvider } from '@lib/sending-notifications/service-worker-provider';
import { ReactNode } from 'react';
import { Sidebar, SidebarContent, SidebarLink } from '@components/sidebar';
import { HomeIcon, LockIcon, Settings } from 'lucide-react';
import { ThemeProvider } from '@components/theme/theme-provider';
import { Toaster } from '@components/ui/toast';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

const LINKS = [
  <SidebarLink
    href="/"
    match={['/updated', '/currently-reading', '/all-manga']}
    icon={HomeIcon}
    text="Home"
    key="home"
    className="mb-2"
  />,
  <SidebarLink href="/private" icon={LockIcon} text="Private" key="private" className="mb-2" />,
  <SidebarLink href="/settings" icon={Settings} text="Settings" key="settings" className="mb-2" />,
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ServiceWorkerProvider>
          {/* TODO: enable after the colors have been properly aligned to dark mode */}
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          <div className="flex h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
            <Sidebar className="px-2 py-6" links={LINKS}>
              <SidebarContent />
            </Sidebar>
            <div className="m-3 flex-1 rounded-md bg-white shadow-lg shadow-slate-400">{children}</div>
          </div>
          {/* </ThemeProvider> */}
        </ServiceWorkerProvider>
        <Toaster />
      </body>
    </html>
  );
}
