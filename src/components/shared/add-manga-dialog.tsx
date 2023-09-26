'use client';

import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { FormEvent, useTransition } from 'react';
import { useToast } from '../ui/use-toast';
import { createMangaAction } from '@/src/actions/add-manga-action';

type AddMangaDialogProps = {
  smallButton?: boolean;
};

export function AddMangaDialog({ smallButton = false }: AddMangaDialogProps) {
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  async function addManga(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(() =>
      createMangaAction(formData).then(errorMsg => {
        if (errorMsg?.error === 'ALREADY IN DATABASE') {
          toast({
            title: 'Already in our library!',
            description: 'We already have this manga in your database.',
          });
        }
      }),
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {smallButton ? (
          <Button size="sm" className="relative">
            Add Manga
          </Button>
        ) : (
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Add Manga
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manga</DialogTitle>
          <DialogDescription>Copy and paste the manga mangadex URL to save.</DialogDescription>
        </DialogHeader>
        <form onSubmit={addManga} id="create-manga-form" className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Manga URL</Label>
            <Input id="url" name="url" placeholder="https://mangadex.org/title/{id}/{title}"></Input>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="add-to-my-library" />
              <label
                htmlFor="add-to-my-library"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add to my Library
              </label>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button form="create-manga-form">Save Manga</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
