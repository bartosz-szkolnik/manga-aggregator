import { Separator } from '@components/ui/separator';
import { verifyAccess } from '@auth/utils';
import { Metadata } from 'next';
import { fetchProfile } from '@lib/profile/data';
import { RecommendedMangaScrollArea } from '@home/components/recommended';
import { Statistics } from '@home/components/statistics';
import { RecentlyUpdatedMangaScrollArea } from '@home/components/recently-updated';
import { RecentlyAddedMangaScrollArea } from '@home/components/recently-added';
import { TrendingNowMangaScrollArea } from '@home/components/trending-now';
import { ContinueReadingMangaScrollArea } from '@home/components/continue-reading';

export const metadata: Metadata = { title: 'Home' };

export default async function HomePage() {
  const { profile } = await fetchProfile();

  return (
    <main className="overflow-auto px-4 py-4 lg:px-8">
      {verifyAccess(profile).includes('read-own') && <Statistics />}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
          <p className="text-sm text-muted-foreground">Top picks for you. Updated weekly.</p>
        </div>
      </div>
      <Separator className="mb-6 mt-4" />

      <div className="flex flex-col gap-8">
        <RecommendedMangaScrollArea />
        {verifyAccess(profile).includes('read-own') && <ContinueReadingMangaScrollArea />}
        <TrendingNowMangaScrollArea />
        <RecentlyUpdatedMangaScrollArea />
        <RecentlyAddedMangaScrollArea />
      </div>
    </main>
  );
}
