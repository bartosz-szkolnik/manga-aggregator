'use client';

import { useEffect, useState, useTransition } from 'react';
import { revokeSubscription, subscribe } from './notifications-actions';
import { FormControl, Label, Switch, Description } from '@components/ui/form';

export function NotificationsSwitch() {
  const [, startTransition] = useTransition();
  const [isSubscribed, setIsSubscribed] = useState(false);
  // custom pending because transition doesn't cover all of the necessary actions performed
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getPushManager()
      .then(manager => manager.getSubscription())
      .then(subscription => {
        setIsSubscribed(Boolean(subscription));
      });
  });

  const handleSubscribe = async () => {
    setPending(true);
    const manager = await getPushManager();
    const subscription = await manager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env['NEXT_PUBLIC_VAPID_KEY'],
    });

    const sub = subscription.toJSON();
    startTransition(async () => {
      await subscribe(sub);
      setPending(false);
    });
  };

  const handleRevoke = async () => {
    setPending(true);
    const manager = await getPushManager();
    const subscription = await manager.getSubscription();
    await subscription?.unsubscribe();

    startTransition(async () => {
      await revokeSubscription(subscription?.endpoint!);
      setPending(false);
    });
  };

  return (
    <FormControl controlName="receive-notifications" controlType="switch">
      <div>
        <Label>Manga Updates</Label>
        <Description>Do you want to receive notifications for Manga updates?</Description>
      </div>
      <Switch
        disabled={pending}
        checked={isSubscribed}
        onCheckedChange={() => (isSubscribed ? handleRevoke() : handleSubscribe())}
      />
    </FormControl>
  );
}

async function getPushManager() {
  return navigator.serviceWorker.ready.then(sw => sw.pushManager);
}
