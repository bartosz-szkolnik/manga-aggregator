'use client';

import { Button } from '@components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

// TODO: enable after the colors have been properly aligned to dark mode

export function ThemeToggle() {
  // const { theme, setTheme } = useTheme();
  const theme = 'light' as 'light' | 'dark' | 'system';

  function handleChangeTheme(value: 'light' | 'dark' | 'system') {
    // if (value === 'light') setTheme('dark');
    // if (value === 'dark') setTheme('system');
    // if (value === 'system') setTheme('light');
  }

  console.log('asd');

  return (
    <Button
      disabled
      variant="ghost"
      size="icon"
      onClick={() => handleChangeTheme(theme as 'light' | 'dark' | 'system')}
    >
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'dark' && <Moon className="absolute h-[1.2rem] w-[1.2rem]" />}
      {theme === 'system' && <Monitor className="absolute h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">{theme} theme</span>
    </Button>
  );
}
