import { AddMangaDialog } from '@lib/add-manga/add-manga-dialog';
import { BookOpenText } from 'lucide-react';

type NoMangaPlaceholderProps = {
  text?: string;
  description?: string;
};

export function NoMangaPlaceholder({
  text = 'No mangas added',
  description = 'You have not added any mangas. Add one below.',
}: NoMangaPlaceholderProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <BookOpenText className="h-24 w-24"></BookOpenText>
        <h3 className="mt-4 text-lg font-semibold">{text}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        <AddMangaDialog smallButton={true}></AddMangaDialog>
      </div>
    </div>
  );
}
