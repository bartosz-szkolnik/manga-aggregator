'use client';

import { FormEvent, forwardRef, MouseEventHandler, useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { addManga as addMangaAction } from './add-manga-action';

type AddMangaDialogProps = {
  smallButton?: boolean;
};

export function AddMangaDialog({ smallButton = false }: AddMangaDialogProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  // const { toast } = useToast();

  async function addManga(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(async () => {
      const { error, success } = await addMangaAction(formData);
      if (error) {
        handleAddMangaError(error);
      } else {
        console.log(`We have added this manga to our database. The id is ${success}`);
      }
      setOpen(false);
    });
  }

  // pattern="https://mangadex.org/title/.*/.*"

  return (
    <Dialog open={open} onOpenChange={value => setOpen(value)}>
      <DialogTrigger asChild>
        <TriggerButton smallButton={smallButton} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manga to our Database</DialogTitle>
          <DialogDescription>Copy the url on MangaDex and paste it here to save.</DialogDescription>
        </DialogHeader>
        <form onSubmit={addManga} id="add-manga-form" className="grid gap-4 py-4">
          {/* <div className="grid gap-2">
            <Label htmlFor="url">Manga URL</Label>
            <Input
              required
              
              id="url"
              name="url"
              placeholder="https://mangadex.org/title/{id}/{title}"
            ></Input>
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox id="add-to-my-library" name="add-to-my-library" value="add-to-my-library" />
              <label
                htmlFor="add-to-my-library"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add to my Library
              </label>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox id="start-following" name="start-following" value="start-following" />
              <label
                htmlFor="start-following"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Start following
              </label>
            </div>
          </div> */}
          <label htmlFor="url">Manga url</label>
          <input type="text" name="url" id="url" placeholder="https://mangadex.org/title/{id}/{title}" />
          <br />
          <div>
            <input defaultChecked type="checkbox" id="add-to-user-library" name="add-to-user-library" />
            <label htmlFor="add-to-user-library">Add to my Library</label>
          </div>
          <br />
          <div>
            <input defaultChecked={false} type="checkbox" id="add-to-following" name="add-to-following" />
            <label htmlFor="add-to-following">Start following</label>
          </div>
        </form>
        <DialogFooter>
          <Button form="add-manga-form">Save Manga</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const TriggerButton = forwardRef<HTMLButtonElement, { smallButton: boolean; onClick?: MouseEventHandler }>(
  ({ smallButton = false, onClick }, ref) =>
    smallButton ? (
      <Button ref={ref} size="sm" className="relative" onClick={onClick}>
        Add Manga
      </Button>
    ) : (
      <Button onClick={onClick} ref={ref}>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Add Manga
      </Button>
    ),
);
TriggerButton.displayName = 'TriggerButton';

async function handleAddMangaError(error: 'URL is required' | 'Manga is already in Database' | 'Something went wrong') {
  console.error(error);
}

// toast({
//   title: 'Already in our database!',
//   description: 'We already have this manga in our database.',
//   variant: 'destructive',
// });
// toast({
//   title: 'Success!',
//   description: 'We have added this manga to our database.',
// });
// }
