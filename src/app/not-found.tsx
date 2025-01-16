import { Button } from '@components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="flex max-h-screen min-h-screen md:bg-gradient-to-r md:from-gradient-from md:to-gradient-to">
      <div className="max-h-screen w-full rounded-md bg-background shadow-lg shadow-slate-400 dark:shadow-none md:m-3">
        <div className="ml-4 mt-4 flex h-[calc(100vh-2rem)] flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">404 · Not Found</h2>
          <p>This page doesn’t exist. </p>
          <Button className="mt-4" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
