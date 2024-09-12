'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { useState } from 'react';
import { useFormState as useActionState } from 'react-dom';
import { signOut } from './sign-out-action';
import { ActionButton } from '@components/ui/form';
import { LogOut } from 'lucide-react';

export function SignOutButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const [, submitAction] = useActionState(async () => {
    await signOut();
  }, null);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">
          <LogOut className="mr-2 h-5 w-5" />
          Sign out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Are you sure you want to sign out?</DialogTitle>
          <DialogDescription>Maybe you&apos;d like to stay a little bit longer?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Stay in the app
          </Button>
          <ActionButton submitAction={submitAction}>Sign me out</ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
