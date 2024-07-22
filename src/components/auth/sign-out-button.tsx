'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { useState } from 'react';

export function SignOutButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className} variant="ghost">
          Sign out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Are you sure you want to sign out?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Stay in the app
          </Button>
          <form action="/auth/sign-out" method="post">
            <Button>Sign me out</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
