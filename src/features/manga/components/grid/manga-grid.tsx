'use client';

import { MangaGridResponse } from '@manga/lib/types';
import { useEffect, useRef, useState } from 'react';
import { MangaArtwork } from '@manga/components/artwork';
import { useSearchParams } from 'next/navigation';
import {
  setHowManyMangasToRefetch,
  setRefetchMangaUseCookieToFalse,
} from '@manga/utils/refetch-manga/refetch-manga.client';
import { AddMangaToUserLibraryButton } from '@manga/components/common/add-manga-to-user-library';
import { FollowMangaButton } from '@manga/components/common/follow-manga';
import { FavoriteMangaButton } from '@manga/components/common/favorite-manga';
import { UpdateProgressForm } from '@manga/components/common/update-progress';
import { updateSearchParamsShallowly } from '@utils/utils';
import { MangasInRowSkeleton } from '@components/skeletons';

type MangaGridProps = {
  response: MangaGridResponse;
  loadMoreMangasAction: (offset: number) => Promise<MangaGridResponse>;
};

export function MangaGrid({ response, loadMoreMangasAction }: MangaGridProps) {
  const { data, total, offset } = response;
  const [state, setState] = useState({ data, hasMore: offset < total, loading: false });

  const [previousResponse, setPreviousResponse] = useState(response);
  if (previousResponse !== response) {
    setPreviousResponse(response);
    setState({ data, hasMore: offset < total, loading: false });

    setRefetchMangaUseCookieToFalse();
    if (data.length <= 10) {
      setHowManyMangasToRefetch(10);
    }
  }

  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');
    params.delete('size');
    if (!params.has('tab')) {
      params.set('tab', 'grid');
    }

    updateSearchParamsShallowly(params);
  }, [searchParams]);

  async function handleLoadMore() {
    if (!state.hasMore || state.loading) {
      return;
    }

    setState(state => ({ ...state, loading: true }));
    const response = await loadMoreMangasAction(state.data.length);
    setState(curr => ({
      data: [...curr.data, ...response.data],
      hasMore: response.offset + response.data.length < response.total,
      loading: false,
    }));

    const totalLength = state.data.length + response.data.length;
    setHowManyMangasToRefetch(totalLength);
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 pb-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
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
        {state.loading && <MangasInRowSkeleton total={total} fetchedAmount={state.data.length} />}
      </div>
      {!state.loading && <MangasLoader onLoad={handleLoadMore} />}
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
