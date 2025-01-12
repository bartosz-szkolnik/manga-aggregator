import { CommandItem, CommandSubItem } from '@components/ui/command';
import { Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { closeCommandPromptResetPages, setPages } from './command-prompt-reducer';
import { useCommandPrompt } from './command-prompt-context';

export function CommandPromptTheme() {
  const theme = useTheme();
  const { dispatch, state } = useCommandPrompt();

  function handleChangeTheme(value: 'dark' | 'light' | 'system') {
    theme.setTheme(value);
    dispatch(closeCommandPromptResetPages());
  }

  function handleOpenThemePage() {
    dispatch(setPages([...state.pages, 'theme']));
  }

  return (
    <>
      <CommandItem onSelect={handleOpenThemePage}>
        <Monitor className="h-5 w-5" />
        Change theme…
      </CommandItem>
      <CommandSubItem value="dark-theme" startsWith={['theme', 'dark']} onSelect={() => handleChangeTheme('dark')}>
        Change theme to Dark
      </CommandSubItem>
      <CommandSubItem value="light-theme" startsWith={['theme', 'light']} onSelect={() => handleChangeTheme('light')}>
        Change theme to Light
      </CommandSubItem>
      <CommandSubItem
        value="system-theme"
        startsWith={['theme', 'system']}
        onSelect={() => handleChangeTheme('system')}
      >
        Change theme to System
      </CommandSubItem>
    </>
  );
}
