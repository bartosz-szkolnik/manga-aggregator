export async function GET(
  _request: Request,
  props: { params: Promise<{ 'manga-id': string; 'manga-cover': string }> }
) {
  const params = await props.params;
  return await fetch(`https://mangadex.org/covers/${params['manga-id']}/${params['manga-cover']}`, {
    headers: { origin: 'mangadex.org' },
  });
}
