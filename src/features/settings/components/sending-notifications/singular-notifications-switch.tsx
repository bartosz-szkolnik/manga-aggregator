'use client';

import { Description, FormControl, Label, Switch } from '@components/ui/form';
import { useTransition } from 'react';
import { setReceivingSingularNotificationsTo } from './notifications-actions';
import { ActionResultErrors } from '@utils/types';
import { toast } from 'sonner';
import { exhaustiveCheck } from '@utils/utils';

type SingularNotificationsSwitchProps = {
  receiveSingularNotifications: boolean;
};

export function SingularNotificationsSwitch({ receiveSingularNotifications }: SingularNotificationsSwitchProps) {
  const [pending, startTransition] = useTransition();

  function handleChange() {
    startTransition(async () => {
      const { error } = await setReceivingSingularNotificationsTo(!receiveSingularNotifications);
      if (error) {
        handleErrors(error);
      }
    });
  }

  return (
    <FormControl controlName="single-notifications" controlType="switch">
      <div>
        <Label>Manga Singular Updates</Label>
        <Description>Do you want to receive singular notifications for each favorite Manga?</Description>
      </div>
      <Switch disabled={pending} checked={receiveSingularNotifications} onCheckedChange={handleChange} />
    </FormControl>
  );
}

function handleErrors(error: ActionResultErrors<typeof setReceivingSingularNotificationsTo>) {
  if (error === 'NOT_SIGNED_IN_ERROR') {
    toast.error('You need to be signed in to perform this action.');
    return;
  }
  if (error === 'SOMETHING_WENT_WRONG') {
    toast.error('Something went wrong. Please try again.');
    return;
  }

  exhaustiveCheck(error);
}
