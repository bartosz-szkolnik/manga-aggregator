import { Button } from '@components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found · Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default function NotFound() {
  return (
    // calc is used to circumvent the margin not working properly with h-screen
    <div className="m-3 flex h-[calc(100vh-1.5rem)] w-screen flex-col items-center justify-center rounded-md bg-white shadow-lg shadow-slate-400">
      <h2 className="text-2xl font-semibold tracking-tight">404 · Not Found</h2>
      <p>This page doesn’t exist. </p>
      <Button className="mt-4" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
