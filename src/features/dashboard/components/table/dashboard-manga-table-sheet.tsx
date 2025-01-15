import { MangaPortrait, MangaSheet } from '@manga/components/artwork';
import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { ChevronRight } from 'lucide-react';
import { MangaTableResponse } from '@manga/lib/types';
import { RemoveMangaFromDatabaseButton } from '@admin-dashboard/components/remove-manga-from-database';
import { EditMangaAttributesDialog } from '@admin-dashboard/components/edit-manga-attributes';

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
          <MangaPortrait imageUrl={manga.imageUrl} title={manga.title} size="lg" />
        </div>
        <div className="mt-4 grid gap-4 py-4">
          <RemoveMangaFromDatabaseButton mangaId={manga.id} />
          <EditMangaAttributesDialog data={manga} />
        </div>
      </MangaSheet>
    </Sheet>
  );
}
