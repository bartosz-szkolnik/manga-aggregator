import { getCurrentlyReadAmount, getUpdatedMangasAmount } from '@lib/count-functions';
import { createServerClient } from '@utils/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Home · Manga Aggregator',
};

export default async function HomePage() {
  const { isLoggedIn, userId, supabase } = await createServerClient();
  if (!isLoggedIn) {
    return redirect('/all-manga');
  }

  const [updatedCount, nextUpCount] = await Promise.all([
    getUpdatedMangasAmount(supabase, userId!),
    getCurrentlyReadAmount(supabase, userId!),
  ]);

  if (updatedCount === 0 && nextUpCount === 0) {
    return redirect('/your-library');
  }

  if (updatedCount === 0) {
    return redirect('/currently-reading');
  }

  return redirect('/updated');
}
