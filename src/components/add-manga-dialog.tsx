import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

type AddMangaDialogProps = {
  smallButton?: boolean;
};

export function AddMangaDialog({ smallButton = false }: AddMangaDialogProps) {
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
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Manga URL</Label>
            <Input id="url" placeholder="https://mangadex.org/title/{id}/{title}"></Input>
          </div>
        </div>
        <DialogFooter>
          <Button>Save Manga</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
