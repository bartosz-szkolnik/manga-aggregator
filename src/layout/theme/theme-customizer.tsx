'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Palette, Monitor, Check } from 'lucide-react';
import { cn } from '@utils/utils';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/form/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useState, useEffect, CSSProperties } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { BASE_COLORS, Color } from './base-colors';
import { saveToCookies } from '@utils/cookies';

const COLOR_COOKIE_KEY = 'color';

export function ThemeCustomizer({ defaultColor }: { defaultColor: string }) {
  const [color, setColor] = useState<Color>(getProperColor(defaultColor));

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.add(color);
    saveToCookies(COLOR_COOKIE_KEY, color);

    return () => rootElement.classList.remove(color);
  }, [color]);

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'ghost'} size="icon" className="md:hidden">
            <Palette />
          </Button>
        </SheetTrigger>
        <SheetContent showCloseChevron={false} className="p-6 pt-0" side="bottom">
          <Customizer color={color} setColor={setColor} />
        </SheetContent>
      </Sheet>
      <div className="hidden items-center md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'ghost'} size="icon">
              <Palette />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="z-40 w-[400px] rounded-[12px] bg-background p-6">
            <Customizer color={color} setColor={setColor} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function Customizer({ color, setColor }: { color: Color; setColor: (value: Color) => void }) {
  const { setTheme: setMode, theme: mode, resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {BASE_COLORS.map(theme => {
              const isActive = theme.name === color;

              return (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={theme.name}
                  onClick={() => setColor(theme.name)}
                  className={cn('justify-start', isActive && 'border-2 border-primary')}
                  style={
                    {
                      '--theme-primary': `hsl(${theme?.activeColor[resolvedTheme === 'dark' ? 'dark' : 'light']})`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]',
                    )}
                  >
                    {isActive && <Check className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            <>
              <Button
                variant={'outline'}
                size="sm"
                onClick={() => setMode('light')}
                className={cn(mode === 'light' && 'border-2 border-primary')}
              >
                <Sun className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Light
              </Button>
              <Button
                variant={'outline'}
                size="sm"
                onClick={() => setMode('dark')}
                className={cn(mode === 'dark' && 'border-2 border-primary')}
              >
                <Moon className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Dark
              </Button>
              <Button
                variant={'outline'}
                size="sm"
                onClick={() => setMode('system')}
                className={cn(mode === 'system' && 'border-2 border-primary')}
              >
                <Monitor className="mr-2 h-[1.2rem] w-[1.2rem]" />
                System
              </Button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProperColor(color: string): Color {
  return isColor(color) ? color : 'zinc';
}

function isColor(color: string): color is Color {
  return BASE_COLORS.map(c => c.name).includes(color as Color);
}
