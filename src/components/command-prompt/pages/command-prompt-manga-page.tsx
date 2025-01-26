import { CommandItem, CommandLoading } from '@components/ui/command';
import { useDebounce, useFetch } from '@utils/hooks';
import { createBrowserClient } from '@utils/supabase/client';
import { useCommandState } from 'cmdk';
import { redirect } from 'next/navigation';
import { useCommandPrompt } from '../command-prompt-context';
import { closeCommandPrompt } from '../command-prompt-reducer';

type Manga = {
  id: string;
  title: string;
};

// This is just a proof of concept, further development is required

export function CommandPromptMangaPage() {
  const { dispatch } = useCommandPrompt();

  const search = useCommandState(state => state.search);
  const debouncedFetchManga = useDebounce(fetchManga);
  const { data, loading } = useFetch<Manga[]>(debouncedFetchManga, search);

  function handleSelect(mangaId: string) {
    dispatch(closeCommandPrompt());
    redirect(`/manga/details/${mangaId}`);
  }

  if (loading) {
    return <CommandLoading>Fetching mangas…</CommandLoading>;
  }

  return data.map(item => (
    <CommandItem onSelect={() => handleSelect(item.id)} key={item.id}>
      {item.title}
    </CommandItem>
  ));
}

async function fetchManga(search = '') {
  const { supabase } = createBrowserClient();
  const { data, error } = await supabase.from('manga').select('title, id').ilike('title', `%${search}%`);

  if (error) {
    return [];
  }

  return data;
}
