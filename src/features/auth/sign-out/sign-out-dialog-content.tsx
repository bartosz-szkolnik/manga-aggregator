'use client';

import { Button } from '@components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ActionButton } from '@components/ui/form';
import { useActionState } from 'react';
import { signOut } from './sign-out-action';

export function SignOutDialogContent({ closeModalAction }: { closeModalAction: () => void }) {
  const [, submitAction] = useActionState(async () => {
    await signOut();
  }, null);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-4">Are you sure you want to sign out?</DialogTitle>
        <DialogDescription>Maybe you&apos;d like to stay a little bit longer?</DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex gap-2">
        <Button onClick={() => closeModalAction()} variant={'secondary'}>
          Stay in the app
        </Button>
        <ActionButton submitAction={submitAction}>Sign me out</ActionButton>
      </DialogFooter>
    </DialogContent>
  );
}
