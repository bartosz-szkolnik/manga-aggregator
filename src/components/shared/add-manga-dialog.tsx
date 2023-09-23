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
import { Mangadex } from '../../lib/mangadex.types';
import { MangadexCover } from '../../lib/mangadex-cover.types';
import { createServerClient } from '../../utils/supabase';

type AddMangaDialogProps = {
  smallButton?: boolean;
};

export function AddMangaDialog({ smallButton = false }: AddMangaDialogProps) {
  async function createManga(formData: FormData) {
    'use server';
    const { supabase } = await createServerClient();

    const url = formData.get('url') as string | null;
    if (!url) {
      return;
    }

    const id = getId(url);
    const { data } = await supabase.from('manga').select('mangadex_id').eq('mangadex_id', id);
    if (Number(data?.length) > 0) {
      console.log('We already have this manga in out database.');
      return;
    }

    const [mangaData, coverData] = await Promise.all([
      fetch(`https://api.mangadex.org/manga/${id}`).then(r => r.json()) as Promise<Mangadex>,
      fetch(
        `https://api.mangadex.org/cover?limit=10&manga%5B%5D=${id}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc`,
      ).then(r => r.json()) as Promise<MangadexCover>,
    ]);

    const { error } = await supabase.from('manga').insert({
      mangadex_id: id,
      title: mangaData.data.attributes.title.en,
      image_url: `https://mangadex.org/covers/${id}/${coverData.data[0].attributes.fileName}`,
    });

    if (error) {
      console.error(error);
    }
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
        <form action={createManga} id="create-manga-form" className="grid gap-4 py-4">
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

function getId(url: string) {
  const parts = url.split('/');
  return parts[4];
}
