import { CommandGroup, CommandItem, CommandShortcut } from '@components/ui/command';
import { LayoutGrid, BookPlus } from 'lucide-react';
import { openAddNewMangaModal, openMangaPage } from '../command-prompt-reducer';
import { useCommandPrompt } from '../command-prompt-context';

export function CommandPromptMangaGroup() {
  const { dispatch } = useCommandPrompt();

  return (
    <CommandGroup heading="Manga">
      <CommandItem onSelect={() => dispatch(openMangaPage())}>
        <LayoutGrid className="h-5 w-5" />
        <span>Search Manga…</span>
        <CommandShortcut>⌘A</CommandShortcut>
      </CommandItem>
      <CommandItem value="add-manga" onSelect={() => dispatch(openAddNewMangaModal())}>
        <BookPlus className="h-5 w-5" />
        <span>Add Manga via MangaDex ID</span>
      </CommandItem>
    </CommandGroup>
  );
}
