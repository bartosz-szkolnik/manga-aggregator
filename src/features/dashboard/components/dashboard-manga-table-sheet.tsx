import { MangaPortrait, MangaSheet } from '@manga/components/artwork';
import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { ChevronRight } from 'lucide-react';
import { MangaTableResponse } from '@manga/lib/types';
import { RemoveMangaFromDatabaseButton } from '@lib/remove-manga-from-database';
import { EditMangaAttributesDialog } from '@lib/edit-manga-attributes';

type AdminDashboardMangaTableSheetProps = {
  manga: MangaTableResponse['data'][number];
};

export function AdminDashboardMangaTableSheet({ manga }: AdminDashboardMangaTableSheetProps) {
  const { mangadexId, title, description } = manga;

  return (
    <Sheet key={mangadexId}>
      <SheetTrigger asChild>
        <Button size="xs">
          Open
          <ChevronRight />
        </Button>
      </SheetTrigger>
      <MangaSheet mangaDexId={mangadexId} title={title} description={description}>
        <div className="mt-4">
          <MangaPortrait imageUrl={manga.imageUrl} title={manga.title} width={210} height={280} />
        </div>
        <div className="mt-4 grid gap-4 py-4">
          <RemoveMangaFromDatabaseButton mangaId={manga.id} />
          <EditMangaAttributesDialog data={manga} />
        </div>
      </MangaSheet>
    </Sheet>
  );
}
