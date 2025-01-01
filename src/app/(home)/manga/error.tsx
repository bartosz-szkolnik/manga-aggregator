'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {}, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <div className="flex gap-4">
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => router.back()}
        >
          Go back
        </button>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
