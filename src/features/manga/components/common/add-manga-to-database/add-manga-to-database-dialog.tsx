'use client';

import { forwardRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { cn } from '@utils/utils';
import { HandlerFn } from '@utils/types';
import { BookPlus } from 'lucide-react';
import { AddMangaToDatabaseDialogForm } from './add-manga-to-database-form';

type AddMangaToDatabaseDialogProps = {
  smallButton?: boolean;
  className?: string;
};

export function AddMangaToDatabaseDialog({ smallButton = false, className }: AddMangaToDatabaseDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <TriggerButton smallButton={smallButton} className={className} />
      </DialogTrigger>
      <AddMangaToDatabaseDialogContent setOpen={value => setOpen(value)} />
    </Dialog>
  );
}

export function AddMangaToDatabaseDialogContent({ setOpen }: { setOpen: HandlerFn<boolean> }) {
  return (
    <DialogContent className="md:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Add Manga to our Database</DialogTitle>
        <DialogDescription>
          Copy the url from MangaDex and paste it here to add this Manga to our Database.
        </DialogDescription>
      </DialogHeader>
      <AddMangaToDatabaseDialogForm closeModal={() => setOpen(false)} />
    </DialogContent>
  );
}

type TriggerButtonProps = {
  smallButton: boolean;
  className?: string;
};

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ smallButton = false, className, ...props }, ref) =>
    smallButton ? (
      <Button {...props} ref={ref} size="sm" className={cn('relative', className)}>
        Add Manga
      </Button>
    ) : (
      <Button {...props} ref={ref} className={className}>
        <BookPlus className="mr-2 h-5 w-5" />
        Add Manga
      </Button>
    ),
);
TriggerButton.displayName = 'TriggerButton';
