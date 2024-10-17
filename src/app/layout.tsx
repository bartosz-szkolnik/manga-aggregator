import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@utils/utils';
import { ServiceWorkerProvider } from '@lib/sending-notifications/service-worker-provider';
import { ReactNode } from 'react';
import { Toaster } from '@components/ui/toast';
import { ThemeProvider } from '@layout/theme';
import { cookies } from 'next/headers';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin-ext'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const defaultColor = cookies().get('color')?.value ?? 'zinc';

  return (
    <html lang="en" className={defaultColor} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ServiceWorkerProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex max-h-screen md:bg-gradient-to-r md:from-gradient-from md:to-gradient-to">
              {children}
            </div>
          </ThemeProvider>
        </ServiceWorkerProvider>
        <Toaster />
      </body>
    </html>
  );
}
