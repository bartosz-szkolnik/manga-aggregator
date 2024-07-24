import { Separator } from '@components/ui/separator';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder/no-mangas-placeholder';

export default function CurrentlyReading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Currectly Reading Mangas</h2>
          <p className="text-sm text-muted-foreground">Currently reading mangas. You can read them here.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <NoMangaPlaceholder />
    </>
  );
}
