import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@utils/utils';
import { ServiceWorkerProvider } from '@lib/sending-notifications/service-worker-provider';
import { ReactNode } from 'react';
import { Toaster } from '@components/ui/toast';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin-ext'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ServiceWorkerProvider>
          {/* TODO: enable after the colors have been properly aligned to dark mode */}
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          {/* </ThemeProvider> */}
          <div className="flex max-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">{children}</div>
        </ServiceWorkerProvider>
        <Toaster />
      </body>
    </html>
  );
}
