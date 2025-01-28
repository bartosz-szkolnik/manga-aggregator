import { ServerError } from '@components/common/error/error.server';
import { MangasInRowSkeleton } from '@components/skeletons';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { MangaScrollArea } from '@home/components/common/scroll-area';
import { fetchRecommendedMangas } from '@home/lib/recommended/data';
import { Suspense } from 'react';

export async function RecommendedMangaScrollArea() {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Recommended for You</h2>
        <Button asChild variant="ghost">
          <Link href={'/manga/browse'}>Browse more {'>'}</Link>
        </Button>
      </div>
      <Suspense fallback={<MangasInRowSkeleton />}>
        <ScrollArea />
      </Suspense>
    </div>
  );
}

async function ScrollArea() {
  const { data, error } = await fetchRecommendedMangas();
  if (error) {
    return (
      <div className="flex h-[330px] flex-col justify-center">
        <ServerError error={error} />
      </div>
    );
  }

  return <MangaScrollArea data={data} href="/manga/browse" />;
}
