import { For, ParentProps } from 'solid-js';
import { Manga2 } from '../db/db';
import { MangaItem, MangaItemProps } from './manga';
import { sub } from 'date-fns';

export type MangaListProps = {
  mangas?: Manga2[];
};

export function MangaList(props: ParentProps<MangaListProps>) {
  return (
    <ul class="ml-8 flex flex-wrap gap-8">
      <For each={props.mangas ?? []}>
        {manga => (
          <li class="w-[45rem]">
            <MangaItem item={map(manga)} limitTo={5}></MangaItem>
          </li>
        )}
      </For>
    </ul>
  );
}

function map(a: Manga2): MangaItemProps['item'] {
  return {
    name: a.name,
    mangaId: a.mangadex_id,
    imageUrl: a.image_url,
    lastTimeChecked: sub(new Date(), { weeks: 4 }),
  };
}
