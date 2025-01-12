import { createContext, ReactNode, use, useMemo, ActionDispatch } from 'react';
import { CommandPromptAction, CommandPromptState } from './command-prompt-reducer';

export const CommandPromptContext = createContext<{
  dispatch: ActionDispatch<[CommandPromptAction<unknown>]>;
  state: CommandPromptState;
}>({
  dispatch: () => {},
  state: {
    commandPromptOpen: false,
    commandPromptValue: '',
    newMangaModalOpen: false,
    signOutModalOpen: false,
    pages: [],
  },
});

export const useCommandPrompt = () => {
  return use(CommandPromptContext);
};

type CommandPromptContextProviderProps = {
  children: ReactNode;
  dispatch: ActionDispatch<[CommandPromptAction<unknown>]>;
  state: CommandPromptState;
};

export function CommandPromptContextProvider({ children, dispatch, state }: CommandPromptContextProviderProps) {
  const value = useMemo(() => ({ dispatch, state }), [dispatch, state]);
  return <CommandPromptContext value={value}>{children}</CommandPromptContext>;
}
