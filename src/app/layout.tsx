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
            <main className="min-h-screen bg-background flex flex-col items-center">
              <div className="flex flex-col w-full">
                <div className="bg-background">
                  <Nav></Nav>
                  <div className="w-full flex justify-center">
                    <div className="max-w-screen-2xl w-full">{children}</div>
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
