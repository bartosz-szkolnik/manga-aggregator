import { fetchMangaDetails } from '@manga/lib/details/data';

type PageProps = {
  params: Promise<{
    mangaId: string;
  }>;
};

export default async function MangaDetails({ params }: PageProps) {
  const { mangaId } = await params;
  const { title } = await fetchMangaDetails(mangaId);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">Nothing to see here yet mate.</p>
    </>
  );
}
