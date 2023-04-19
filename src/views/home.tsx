import { MangaList } from '../components/manga-list';
import { Show } from 'solid-js';
import { useMangas } from '../hooks/manga';
import { Header } from '../layout/header';

export function Home() {
  const mangas = useMangas();

  return (
    <Show when={!mangas.isLoading} fallback={<div>Loading....</div>}>
      <div class="flex flex-col">
        <Header></Header>
        <main class="mt-8 flex flex-col items-center">
          <h3 class="text-3xl mt-8 mb-2 font-bold">Your mangas: </h3>
          <MangaList mangas={mangas?.data?.data ?? []}></MangaList>
        </main>
      </div>
    </Show>
  );
}
