import { createQuery, useQueryClient } from '@tanstack/solid-query';
import { getManga, getMangas } from '../db/db';

export const useMangas = () => {
  const queryClient = useQueryClient();

  return createQuery(
    () => ['mangas'],
    () => getMangas(),
    {
      onSuccess: data => {
        data.data?.forEach(manga => {
          queryClient.setQueryData(['manga', manga.id], manga);
        });
      },
    },
  );
};

export const useManga = (mangaId: string) => {
  return createQuery(
    () => ['manga', mangaId],
    () => getManga(mangaId),
  );
};
