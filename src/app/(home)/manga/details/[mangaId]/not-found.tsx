'use client';

import { Button } from '@components/ui/button';
import { Frown } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = { title: 'Manga not found' };

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Frown className="mb-8 h-20 w-20" />
      <h2 className="text-2xl font-semibold tracking-tight">404 · Not Found</h2>
      <p>This Manga doesn’t exist in our database.</p>
      <div className="mt-4 flex flex-col gap-4">
        <Button onClick={() => router.back()}>Go back</Button>
        <Button asChild>
          <Link href="/manga/browse">Return to Browsing Mangas</Link>
        </Button>
      </div>
    </main>
  );
}
