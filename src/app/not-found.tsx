import { Button } from '@components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found · Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold tracking-tight">404 · Not Found</h2>
      <p>This page doesn’t exist. </p>
      <Button className="mt-4" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
