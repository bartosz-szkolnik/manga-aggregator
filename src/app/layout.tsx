import { Metadata } from 'next';
import './globals.css';
import { Nav } from '../components/layout/nav';

export const metadata: Metadata = {
  title: 'Manga Aggregator',
  description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <div className="flex flex-col">
            <div className="bg-background">
              <Nav></Nav>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
