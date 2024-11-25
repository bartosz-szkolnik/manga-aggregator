import { Statistic } from '@components/statistics/statistic';
import { AddMangaViaShortcut } from '@lib/add-manga-via-shortcut';
import { HelperDialog } from '@lib/helper-dialog';
import { Profile } from '@lib/types/manga.types';
import { verifyAccess } from '@utils/auth';
import { SupabaseBrowserClient } from '@utils/supabase/client';
import { createServerClient } from '@utils/supabase/server';
import { Book, BookCheck } from 'lucide-react';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function MangaLayout({ children }: { children: ReactNode }) {
  const { supabase, userId, profile } = await createServerClient();
  const helperModalOpenedPreviously = (await cookies()).get('helper-modal')?.value === 'true';

  return (
    <div className="overflow-auto px-4 py-4 lg:px-8">
      {verifyAccess(profile).includes('read-own') && <Statistics supabase={supabase} userId={userId!} />}
      {children}
      {verifyAccess(profile).includes('add') && <AddMangaViaShortcut />}
      <HelperDialog defaultOpen={!helperModalOpenedPreviously} />
    </div>
  );
}

async function Statistics({ supabase, userId }: { supabase: SupabaseBrowserClient; userId: Profile['id'] }) {
  const [mangasRead, mangasPlannedToRead] = await Promise.all([
    getMangasReadAmount(supabase, userId),
    getMangasPlannedToReadAmount(supabase, userId),
  ]);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:ml-2 lg:grid-cols-4">
      <Statistic title="Mangas read" icon={BookCheck}>
        <div className="text-2xl font-bold">{mangasRead}</div>
        <p className="text-xs text-muted-foreground">Good job and keep going!</p>
      </Statistic>
      <Statistic title="Mangas planned to read" icon={Book}>
        <div className="text-2xl font-bold">{mangasPlannedToRead}</div>
        <p className="text-xs text-muted-foreground">We know you can get there if you put your head to it!</p>
      </Statistic>
    </div>
  );
}

async function getMangasReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'finished reading', profile_id: userId });
  return count;
}

async function getMangasPlannedToReadAmount(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const { count } = await supabase
    .from('profile_manga')
    .select('', { count: 'exact' })
    .match({ reading_status: 'want to read', profile_id: userId });
  return count;
}
