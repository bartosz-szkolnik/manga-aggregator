'use client';

import { PropsWithChildren, useEffect } from 'react';

export function ServiceWorkerProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js', { scope: '/' });
    } else {
      console.info('Service workers not available.');
    }
  }, []);

  return children;
}
