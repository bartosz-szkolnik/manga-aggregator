import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Manga' };

export default async function Page() {
  return redirect('/manga/browse');
}
