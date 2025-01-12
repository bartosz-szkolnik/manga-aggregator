import { CommandItem } from '@components/ui/command';
import { Monitor, MoonStar, Sun } from 'lucide-react';
import { closeCommandPromptResetPages } from '../command-prompt-reducer';
import { useTheme } from 'next-themes';
import { useCommandPrompt } from '../command-prompt-context';

export function CommandPromptThemePage() {
  const theme = useTheme();
  const { dispatch } = useCommandPrompt();

  function handleChangeTheme(value: 'dark' | 'light' | 'system') {
    theme.setTheme(value);
    dispatch(closeCommandPromptResetPages());
  }

  return (
    <>
      <CommandItem value="dark-theme" onSelect={() => handleChangeTheme('dark')}>
        <MoonStar className="h-5 w-5" />
        Change theme to Dark
      </CommandItem>
      <CommandItem value="light-theme" onSelect={() => handleChangeTheme('light')}>
        <Sun className="h-5 w-5" />
        Change theme to Light
      </CommandItem>
      <CommandItem value="system-theme" onSelect={() => handleChangeTheme('system')}>
        <Monitor className="h-5 w-5" />
        Change theme to System
      </CommandItem>
    </>
  );
}
