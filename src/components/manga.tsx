import { Link } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { For } from 'solid-js';
import { getChaptersFor, getLatestChaptersFor } from '../db/api';
import { chapterResponseToChapterMap } from '../db/mappers';
import { Chapter } from './chapter';
import { Card } from './card';
import { Button } from './button';

export type MangaItemProps = {
  item: {
    mangaId: string;
    name: string;
    imageUrl: string;
    lastTimeChecked: Date;
  };
  limitTo?: number;
};

export function MangaItem(props: MangaItemProps) {
  const { mangaId, lastTimeChecked } = props.item;

  const chapters = createQuery(
    () => ['chapter', mangaId],
    () =>
      getChaptersFor(mangaId).then(chapters =>
        [...chapters]
          .sort((a, b) => Number(a.attributes.chapter) - Number(b.attributes.chapter))
          .reverse()
          .slice(0, props.limitTo ?? Infinity),
      ),
  );

  const latestChaptersIds = createQuery(
    () => ['latest-chapters', mangaId],
    () => getLatestChaptersFor(mangaId, lastTimeChecked).then(chapters => chapters.data.map(c => c.id)),
  );

  return (
    <Card
      imageSrc={props.item.imageUrl}
      title={props.item.name}
      footer={
        <div class="flex justify-between">
          <Link
            class="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-blue-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            href={`manga/${mangaId}`}
          >
            <span class="text-sm font-bold">Read more</span>
          </Link>
          <Button type="link" href={`https://mangadex.org/title/${mangaId}/`}>
            <span class="text-sm font-bold">Read on Mangadex</span>
          </Button>
        </div>
      }
    >
      <ul>
        <For each={chapters.data}>
          {chapter => (
            <li>
              <Chapter
                data={chapterResponseToChapterMap(chapter)}
                isNew={latestChaptersIds.data?.includes(chapter.id) ?? false}
              ></Chapter>
            </li>
          )}
        </For>
      </ul>
    </Card>
  );
}
