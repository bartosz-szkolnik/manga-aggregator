'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogTrigger } from '@components/ui/dialog';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { SignOutDialogContent } from './sign-out-dialog-content';

export function SignOutButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">
          <LogOut className="mr-2 h-5 w-5" />
          Sign out
        </Button>
      </DialogTrigger>
      <SignOutDialogContent closeModalAction={() => setOpen(false)}></SignOutDialogContent>
    </Dialog>
  );
}
