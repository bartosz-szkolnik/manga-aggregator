'use client';

import { useReducer, KeyboardEvent } from 'react';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@components/ui/command';
import { KEY_K, useShortcut } from '@utils/hooks';
import { AddMangaToDatabaseDialogContent } from '@manga/components/common/add-manga-to-database';
import { Dialog } from '@components/ui/dialog';
import {
  closeNewMangaModal,
  initialState,
  reducer,
  closeCommandPrompt,
  openCommandPrompt,
  toggleCommandPrompt,
  setPages,
  changeCommandPromptValue,
  closeSignOutModal,
} from './command-prompt-reducer';
import { CommandPromptMangaPage, CommandPromptAnimePage, CommandPromptThemePage } from './pages';
import { CommandPromptContextProvider } from './command-prompt-context';
import { CommandPromptMangaGroup, CommandPromptNavigation } from './groups';
import { CommandPromptTheme } from './command-prompt-theme';
import { SignOutDialogContent } from '@auth/sign-out/sign-out-dialog-content';
import { CommandPromptSignOut } from './command-prompt-sign-out';

export function CommandPrompt() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const page = state.pages[state.pages.length - 1];

  useShortcut(`Command+${KEY_K}`, event => {
    event.preventDefault();
    dispatch(toggleCommandPrompt());
  });

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Escape goes to previous page
    // Backspace goes to previous page when search is empty
    if (event.key === 'Escape' || (event.key === 'Backspace' && !state.commandPromptValue)) {
      event.preventDefault();
      dispatch(setPages(state.pages.slice(0, -1)));
    }
  }

  function handleClose() {
    // Only close if on initial page
    if (state.pages.length === 0) {
      dispatch(closeCommandPrompt());
    }
  }

  return (
    <CommandPromptContextProvider dispatch={dispatch} state={state}>
      <Button variant={'ghost'} size="icon" onClick={() => dispatch(openCommandPrompt())}>
        <Search />
      </Button>
      <CommandDialog
        loop
        shouldFilter={page !== 'manga'}
        title="Command prompt"
        open={state.commandPromptOpen}
        onOpenChange={handleClose}
        onKeyDown={handleKeyDown}
      >
        <CommandInput
          placeholder="Type a command or search..."
          value={state.commandPromptValue}
          onValueChange={value => dispatch(changeCommandPromptValue(value))}
        />
        <CommandList>
          {!page && (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandPromptMangaGroup />
              {/* <CommandSeparator />
              <CommandPromptAnimeGroup /> */}
              <CommandSeparator />
              <CommandGroup heading="General">
                <CommandPromptTheme />
                <CommandPromptSignOut />
              </CommandGroup>
              <CommandSeparator />
              <CommandPromptNavigation />
              {/* <CommandSeparator />
              <CommandPromptHelpGroup /> */}
            </>
          )}

          {page === 'manga' && <CommandPromptMangaPage />}
          {page === 'anime' && <CommandPromptAnimePage />}
          {page === 'theme' && <CommandPromptThemePage />}
        </CommandList>
      </CommandDialog>
      <Dialog open={state.newMangaModalOpen} onOpenChange={() => dispatch(closeNewMangaModal())}>
        <AddMangaToDatabaseDialogContent setOpen={() => dispatch(closeNewMangaModal())} />
      </Dialog>
      <Dialog open={state.signOutModalOpen} onOpenChange={() => dispatch(closeSignOutModal())}>
        <SignOutDialogContent closeModalAction={() => dispatch(closeSignOutModal())} />
      </Dialog>
    </CommandPromptContextProvider>
  );
}
