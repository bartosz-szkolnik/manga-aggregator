export async function GET(_request: Request, { params }: { params: { 'manga-id': string; 'manga-cover': string } }) {
  return await fetch(`https://mangadex.org/covers/${params['manga-id']}/${params['manga-cover']}`, {
    headers: { origin: 'mangadex.org' },
  });
}
