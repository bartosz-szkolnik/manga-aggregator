'use client';

import { useEffect, useState, useTransition } from 'react';
import { revokeSubscription, subscribe } from './notifications-actions';
import { FormControl, Label, Switch, Description } from '@components/ui/form';
import { InstallPrompt } from './install-prompt';

// Firstly I check whether the subscription in database is present, after that I do the checking with the pushManager
// If the subscription in the database was missing, but the pushManager was returning a Subscription from it's memory,
// the switch would be checked even though it wouldn't work as it should
let checkedOnce = false;

export function NotificationsSwitch({ defaultSubscribed }: { defaultSubscribed: boolean }) {
  const [, startTransition] = useTransition();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Custom pending because transition doesn't cover all of the necessary actions performed
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getPushManager()
      .then(manager => manager?.getSubscription())
      .then(subscription => {
        if (!checkedOnce) {
          setIsSubscribed(defaultSubscribed);
        } else {
          setIsSubscribed(Boolean(subscription));
        }
      });
  });

  const handleSubscribe = async () => {
    setPending(true);
    checkedOnce = true;

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
    checkedOnce = true;

    const manager = await getPushManager();
    const subscription = await manager.getSubscription();
    await subscription?.unsubscribe();

    startTransition(async () => {
      await revokeSubscription(subscription?.endpoint);
      setPending(false);
    });
  };

  return (
    <FormControl controlName="receive-notifications" controlType="switch">
      <div>
        <Label>Manga Updates</Label>
        <Description className="mr-4">Do you want to receive notifications for Manga updates?</Description>
        <InstallPrompt />
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
  return navigator.serviceWorker?.ready.then(sw => sw.pushManager);
}
