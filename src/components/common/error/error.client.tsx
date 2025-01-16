'use client';

import { Error } from './error';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { inDevEnvironment } from '@utils/dev-env';

export function ClientError({ error, className }: { error: Error & { digest?: string }; className?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (inDevEnvironment) {
      console.error(error.message);
    }
  }, [error]);

  return (
    <div className="flex h-full flex-col justify-center">
      <Error back={() => router.back()} className={className} />
    </div>
  );
}
