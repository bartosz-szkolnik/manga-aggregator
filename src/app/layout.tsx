import type { Metadata } from 'next';
import { cn } from '@utils/utils';
import { ServiceWorkerProvider } from '@lib/sending-notifications/service-worker-provider';
import { ReactNode } from 'react';
import { Toaster } from '@components/ui/toast';
import { ThemeProvider } from '@layout/theme';
import { cookies } from 'next/headers';
import { inter } from '@ui/font';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s · Manga Aggregator',
    default: 'Manga Aggregator',
  },
  description: 'Here you can find all the manga you love.',
  // metadataBase: new URL(''),
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const defaultColor = (await cookies()).get('color')?.value ?? 'zinc';

  return (
    <html lang="en" className={defaultColor} suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <ServiceWorkerProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ServiceWorkerProvider>
        <Toaster />
      </body>
    </html>
  );
}
