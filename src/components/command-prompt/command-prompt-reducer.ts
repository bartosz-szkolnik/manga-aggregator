import { exhaustiveCheck } from '@utils/utils';

type CommandPromptActionKind =
  | 'openCommandPrompt'
  | 'toggleCommandPrompt'
  | 'closeCommandPrompt'
  | 'closeCommandPromptResetPages'
  | 'openNewMangaModal'
  | 'closeNewMangaModal'
  | 'openSignOutModal'
  | 'closeSignOutModal'
  | 'changeCommandPromptValue'
  | 'setPages'
  | 'openMangaPage';

export type CommandPromptAction<T = unknown> = {
  type: CommandPromptActionKind;
  payload?: T;
};

export type CommandPromptState = {
  commandPromptOpen: boolean;
  newMangaModalOpen: boolean;
  signOutModalOpen: boolean;
  commandPromptValue: string;
  pages: string[];
};

export function openCommandPrompt(): CommandPromptAction {
  return { type: 'openCommandPrompt' };
}

export function toggleCommandPrompt(): CommandPromptAction {
  return { type: 'toggleCommandPrompt' };
}

export function closeCommandPrompt(): CommandPromptAction {
  return { type: 'closeCommandPrompt' };
}

export function closeCommandPromptResetPages(): CommandPromptAction {
  return { type: 'closeCommandPromptResetPages' };
}

export function openAddNewMangaModal(): CommandPromptAction {
  return { type: 'openNewMangaModal' };
}

export function closeNewMangaModal(): CommandPromptAction {
  return { type: 'closeNewMangaModal' };
}

export function openSignOutModal(): CommandPromptAction {
  return { type: 'openSignOutModal' };
}

export function closeSignOutModal(): CommandPromptAction {
  return { type: 'closeSignOutModal' };
}

export function changeCommandPromptValue(payload: string): CommandPromptAction<string> {
  return { type: 'changeCommandPromptValue', payload };
}

export function setPages(payload: string[]): CommandPromptAction<string[]> {
  return { type: 'setPages', payload };
}

export function openMangaPage(): CommandPromptAction {
  return { type: 'openMangaPage' };
}

export const initialState = {
  commandPromptOpen: false,
  newMangaModalOpen: false,
  signOutModalOpen: false,
  commandPromptValue: '',
  pages: [],
} satisfies CommandPromptState;

export const reducer = (state: CommandPromptState, { type, payload }: CommandPromptAction): CommandPromptState => {
  switch (type) {
    case 'openCommandPrompt': {
      return { ...state, commandPromptOpen: true };
    }
    case 'closeCommandPrompt': {
      return { ...state, commandPromptOpen: false };
    }
    case 'closeCommandPromptResetPages': {
      return { ...state, commandPromptOpen: false, pages: [] };
    }
    case 'toggleCommandPrompt': {
      return { ...state, commandPromptOpen: !state.commandPromptOpen };
    }
    case 'openNewMangaModal': {
      return { ...state, commandPromptOpen: false, newMangaModalOpen: true };
    }
    case 'closeNewMangaModal': {
      return { ...state, newMangaModalOpen: false };
    }
    case 'openSignOutModal': {
      return { ...state, commandPromptOpen: false, signOutModalOpen: true };
    }
    case 'closeSignOutModal': {
      return { ...state, signOutModalOpen: false };
    }
    case 'changeCommandPromptValue': {
      return { ...state, commandPromptValue: (payload as string) ?? '' };
    }
    case 'setPages': {
      return { ...state, pages: (payload as string[]) ?? [] };
    }
    case 'openMangaPage': {
      return { ...state, pages: ['manga'], commandPromptValue: '' };
    }
    default:
      exhaustiveCheck(type);
  }
};
