import { fetchMangaDetails } from '@manga/lib/details/data';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    mangaId: string;
  }>;
};

export default async function MangaDetails({ params }: PageProps) {
  const { mangaId } = await params;
  const { data, error } = await fetchMangaDetails(mangaId);

  if (error) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>
      <p className="text-sm text-muted-foreground">Nothing to see here yet mate.</p>
    </>
  );
}
