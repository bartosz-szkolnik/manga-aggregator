'use client';

import { Link } from '@components/ui/link';
import { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(checkIfIsIOS());
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (!isIOS || isStandalone) {
    return (
      <div className="text-sm text-muted-foreground">
        Your browser will ask you to allow notifications from this page.
      </div>
    );
  }

  return (
    <div className="mr-4 mt-4 text-sm text-muted-foreground">
      If you want to receive notifications, you will have to enable push notifications in your browser and install this
      app on your iOS device. Instructions can be found{' '}
      <Link
        className="underline"
        href="https://www.xda-developers.com/how-enable-safari-notifications-iphone/"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </Link>
      .
    </div>
  );
}

function checkIfIsIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !Object.hasOwn(window, 'MSStream');
}
