import { CommandGroup, CommandItem } from '@components/ui/command';
import { LayoutGrid, Plus } from 'lucide-react';
import { setPages } from '../command-prompt-reducer';
import { useCommandPrompt } from '../command-prompt-context';

export function CommandPromptAnimeGroup() {
  const { dispatch, state } = useCommandPrompt();

  return (
    <CommandGroup heading="Anime">
      <CommandItem disabled value="search-anime" onSelect={() => dispatch(setPages([...state.pages, 'anime']))}>
        <LayoutGrid className="h-5 w-5" />
        <span>Search Anime…</span>
      </CommandItem>
      <CommandItem disabled value="add-anime" onSelect={() => {}}>
        <Plus className="h-5 w-5" />
        <span>Add Anime… </span>
      </CommandItem>
    </CommandGroup>
  );
}
