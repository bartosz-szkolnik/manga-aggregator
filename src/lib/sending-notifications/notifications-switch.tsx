'use client';

import { useEffect, useState, useTransition } from 'react';
import { revokeSubscription, subscribe } from './notifications-action';
import { Button } from '@components/ui/button';

export function NotificationsSwitch() {
  const [, startTransition] = useTransition();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getPushManager()
      .then(manager => manager.getSubscription())
      .then(subscription => {
        setIsSubscribed(Boolean(subscription));
      });
  });

  const handleSubscribe = async () => {
    const manager = await getPushManager();
    const subscription = await manager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env['NEXT_PUBLIC_VAPID_KEY'],
    });

    const sub = subscription.toJSON();
    startTransition(() => subscribe(sub));
  };

  const handleRevoke = async () => {
    const manager = await getPushManager();
    const subscription = await manager.getSubscription();
    await subscription?.unsubscribe();

    startTransition(() => revokeSubscription(subscription?.endpoint!));
  };

  return (
    <>
      <h2 className="my-2 text-2xl font-semibold tracking-tight">Notifications</h2>
      <div className="flex flex-col items-start gap-5">
        {isSubscribed ? (
          <>
            <p>
              Notifications are <strong>enabled</strong>
            </p>
            <Button type="button" onClick={handleRevoke}>
              Disable notifications
            </Button>
          </>
        ) : (
          <>
            <p>
              Notifications are <strong>disabled</strong>
            </p>
            <Button type="button" onClick={handleSubscribe}>
              Enable notifications
            </Button>
          </>
        )}
      </div>
    </>
  );
}

async function getPushManager() {
  return navigator.serviceWorker.ready.then(sw => sw.pushManager);
}
