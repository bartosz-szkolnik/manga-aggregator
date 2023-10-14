import { Metadata } from 'next';
import './globals.css';
import { Nav } from '../components/layout/nav';
import { Toaster } from '../components/ui/toaster';
import { ThemeProvider } from '../components/theme-provider';
import { ServiceWorkerProvider } from '../components/service-worker-provider';

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServiceWorkerProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className="flex min-h-screen flex-col items-center bg-background">
              <div className="flex w-full flex-col">
                <div className="bg-background">
                  <Nav></Nav>
                  <div className="flex w-full justify-center">
                    <div className="w-full max-w-screen-2xl">{children}</div>
                  </div>
                </div>
              </div>
            </main>
            <Toaster />
          </ThemeProvider>
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
