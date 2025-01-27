'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TWO_SECONDS = 2000;

export function SignedOut() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), TWO_SECONDS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">You have been logged out.</h1>
      <p className="text-sm text-muted-foreground">Redirecting in 2 seconds...</p>
    </main>
  );
}
