'use client';

import { PropsWithChildren, useEffect } from 'react';

export function ServiceWorkerProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.info('Registering service worker.');
      navigator.serviceWorker.register('/sw.js', { scope: '/' });
    } else {
      console.info('Service worker functionality not available in your browser.');
    }
  }, []);

  return children;
}
