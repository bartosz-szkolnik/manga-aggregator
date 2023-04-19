import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { For, Show } from 'solid-js';
import { getChaptersFor } from '../db/api';
import { useManga } from '../hooks/manga';
import { Header } from '../layout/header';

export function Manga() {
  const mangaId = useParams().mangaId;
  const mangaResp = useManga(mangaId);
  const manga = mangaResp.data?.data?.[0];

  const chapters = createQuery(
    () => ['specific-chapter', mangaId],
    () => {
      return getChaptersFor(mangaId).then(chapters =>
        chapters.filter(chapter => chapter.attributes.translatedLanguage === 'en'),
      );
    },
  );

  return (
    <Show when={!mangaResp.isLoading} fallback={<div>Loading....</div>}>
      <div class="flex flex-col">
        <Header></Header>
        <h3 class="text-xl font-bold">{mangaResp.data?.data?.[0]!.name}</h3>
      </div>
      <span class="flex gap-4 justify-center">
        {/* <Link href="../..">Go back</Link> */}
        {/* <a target="__blank" href={`https://mangadex.org/title/${manga.data?.address}`}>
          {manga.data?.name} on Mangadex
        </a> */}
      </span>
      <ul>
        <For each={chapters.data}>{chapter => <li>{chapter.attributes.title}</li>}</For>
      </ul>
    </Show>
  );
}
