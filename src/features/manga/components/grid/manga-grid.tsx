'use client';

import { MangaGridResponse } from '@manga/lib/types';
import { useEffect, useRef, useState } from 'react';
import { MangaArtwork } from '@manga/components/artwork';

type MangaGridProps = {
  response: MangaGridResponse;
  loadMoreMangasAction: (offset: number) => Promise<MangaGridResponse>;
};

export function MangaGrid({ response: { data, total, offset }, loadMoreMangasAction }: MangaGridProps) {
  const [state, setState] = useState({ data, hasMore: offset < total });

  async function handleLoadMore() {
    if (!state.hasMore) {
      return;
    }

    const response = await loadMoreMangasAction(state.data.length);
    setState(curr => ({
      data: [...curr.data, ...response.data],
      hasMore: response.offset + response.data.length < response.total,
    }));
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 pb-4 md:gap-4">
        {state.data.map(manga => (
          <MangaArtwork key={manga.id} manga={manga} />
        ))}
      </div>

      <MangasLoader onLoad={handleLoadMore} />
    </>
  );
}

function MangasLoader({ onLoad }: { onLoad: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const loadRef = useRef(onLoad);
  if (loadRef.current !== onLoad) {
    loadRef.current = onLoad;
  }

  useEffect(() => {
    const io = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        loadRef.current();
      }
    });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, []);

  return <div className="h-20" ref={ref} />;
}
