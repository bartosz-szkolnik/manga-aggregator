import { buttonVariants } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { AddMangaToDatabaseDialog } from '@lib/add-manga-to-database/add-manga-to-database-dialog';
import { OpenMangaDexButton } from '@lib/open-mangadex-button';
import { cn } from '@utils/utils';
import { BookOpenText } from 'lucide-react';

type NoMangaPlaceholderProps = {
  text?: string;
  description?: string;
  showAllAvailableMangaLink?: boolean;
  showYourLibraryLink?: boolean;
};

export function NoMangaPlaceholder({
  text = 'No mangas added',
  description = 'If you want more, you can browse for new mangas in our "All Available Manga" section. Or you can go directly to MangaDex to browse there and add it to our database.',
  showAllAvailableMangaLink = true,
  showYourLibraryLink = true,
}: NoMangaPlaceholderProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[620px] flex-col items-center justify-center p-2 text-center">
        <BookOpenText className="h-24 w-36"></BookOpenText>
        <h3 className="mt-4 text-lg font-semibold">{text}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-4">
          {showYourLibraryLink && <YourLibraryLink />}
          {showAllAvailableMangaLink && <AllAvailableMangaLink />}
          <OpenMangaDexButton></OpenMangaDexButton>
          <AddMangaToDatabaseDialog smallButton={true}></AddMangaToDatabaseDialog>
        </div>
      </div>
    </div>
  );
}

function AllAvailableMangaLink() {
  return (
    <Link href={'/all-manga'} className={cn(buttonVariants({ variant: 'link' }))}>
      Go to All Manga
    </Link>
  );
}

function YourLibraryLink() {
  return (
    <Link href={'/your-library'} className={cn(buttonVariants({ variant: 'link' }))}>
      Go to Your Library
    </Link>
  );
}
