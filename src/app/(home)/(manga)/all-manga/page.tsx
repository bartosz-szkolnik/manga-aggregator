import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'All Manga · Manga Aggregator',
};

export default async function AllMangaPage() {
  return redirect('/all-manga/browse');
}
