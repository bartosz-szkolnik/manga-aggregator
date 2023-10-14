'use client';

import { Button } from '@/src/components/ui/button';
import { useEffect, useState, useTransition } from 'react';

async function getPushManager() {
  return navigator.serviceWorker.ready.then(sw => sw.pushManager);
}

export function NotificationsButton({
  subscribe,
  revokeSubscription,
}: {
  subscribe: (sub: PushSubscriptionJSON) => Promise<void>;
  revokeSubscription: (endpoint: string) => Promise<void>;
}) {
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
  );
}
