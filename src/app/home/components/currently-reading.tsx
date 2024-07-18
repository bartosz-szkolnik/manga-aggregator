import { Separator } from '@components/ui/separator';
import { NoMangaPlaceholder } from '@lib/no-mangas-placeholder/no-mangas-placeholder';

export function CurrentlyReading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Updated for You</h2>
          <p className="text-sm text-muted-foreground">Recently updated mangas you follow. You can read them here.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <NoMangaPlaceholder />;
    </>
  );
}
