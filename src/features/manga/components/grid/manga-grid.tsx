'use client';

import { MangaGridResponse } from '@manga/lib/types';
import { useEffect, useRef, useState } from 'react';
import { MangaArtwork } from '@manga/components/artwork';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  setHowManyMangasToRefetch,
  setRefetchMangaUseCookieToFalse,
} from '@manga/utils/refetch-manga/refetch-manga.client';
import { AddMangaToUserLibraryButton } from '../common/update-utils/components/add-manga-to-user-library';
import { FollowMangaButton } from '../common/update-utils/components/follow-manga';
import { FavoriteMangaButton } from '../common/update-utils/components/favorite-manga';
import { UpdateProgressForm } from '../common/update-progress';

type MangaGridProps = {
  response: MangaGridResponse;
  loadMoreMangasAction: (offset: number) => Promise<MangaGridResponse>;
};

export function MangaGrid({ response, loadMoreMangasAction }: MangaGridProps) {
  const { data, total, offset } = response;
  const [state, setState] = useState({ data, hasMore: offset < total });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [previousResponse, setPreviousResponse] = useState(response);
  if (previousResponse !== response) {
    setPreviousResponse(response);
    setState({ data, hasMore: offset < total });

    setRefetchMangaUseCookieToFalse();
    if (data.length <= 10) {
      setHowManyMangasToRefetch(10);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    params.delete('size');
    if (!params.has('tab')) {
      params.set('tab', 'grid');
    }

    router.replace(`${pathname}?${params}`);
  }, [pathname, router, searchParams]);

  async function handleLoadMore() {
    if (!state.hasMore) {
      return;
    }

    const response = await loadMoreMangasAction(state.data.length);
    setState(curr => ({
      data: [...curr.data, ...response.data],
      hasMore: response.offset + response.data.length < response.total,
    }));

    const totalLength = state.data.length + response.data.length;
    setHowManyMangasToRefetch(totalLength);
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 pb-4 md:gap-4">
        {state.data.map(manga => {
          const { id, isFavorite, isFollowing, isInLibrary: isInUserLibrary } = manga;

          return (
            <MangaArtwork key={id} manga={manga}>
              <AddMangaToUserLibraryButton mangaId={id} isInLibrary={isInUserLibrary ?? false} setCookie />
              {isInUserLibrary && <FollowMangaButton mangaId={id} isFollowing={isFollowing ?? false} setCookie />}
              {isInUserLibrary && <FavoriteMangaButton mangaId={id} isFavorite={isFavorite ?? false} setCookie />}
              {isInUserLibrary && <UpdateProgressForm manga={manga} setCookie />}
            </MangaArtwork>
          );
        })}
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
