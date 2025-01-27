// Code taken from https://www.taniarascia.com/keyboard-shortcut-hook-react

import { detectOperatingSystem } from '@utils/utils';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export const KEY_A = 'KeyA';
export const KEY_S = 'KeyS';
export const KEY_K = 'KeyK';
export const KEY_ESCAPE = 'Escape';
export const KONAMI_CODE = 'ArrowUp+ArrowUp+ArrowDown+ArrowDown+ArrowLeft+ArrowRight+ArrowLeft+ArrowRight+KeyB+KeyA';
export const KEY_ARROW_LEFT = 'ArrowLeft';
export const KEY_ARROW_RIGHT = 'ArrowRight';
export const KEY_ARROW_UP = 'ArrowUp';
export const KEY_ARROW_DOWN = 'ArrowDown';
export const KEY_ENTER = 'Enter';
export const KEY_BACKSPACE = 'Backspace';

type ModifierMap = {
  Control: (event: KeyboardEvent) => boolean;
  Alt: (event: KeyboardEvent) => boolean;
  Command: (event: KeyboardEvent) => boolean;
  Shift: (event: KeyboardEvent) => boolean;
  Meta: (event: KeyboardEvent) => boolean;
};

const modifierMap: ModifierMap = {
  Control: (event: KeyboardEvent) => event.ctrlKey,
  Alt: (event: KeyboardEvent) => event.altKey,
  Command: (event: KeyboardEvent) => event.metaKey,
  Shift: (event: KeyboardEvent) => event.shiftKey,
  Meta: (event: KeyboardEvent) => {
    const os = detectOperatingSystem();
    return os === 'MacOS' ? event.metaKey : event.ctrlKey;
  },
};

function isProperModifier(value: string): value is keyof ModifierMap {
  return Object.keys(modifierMap).includes(value);
}

export function useShortcut(
  shortcut: string,
  callback: (event: KeyboardEvent) => void,
  options = { disableTextInputs: true },
) {
  const callbackRef = useRef(callback);
  const [keyCombo, setKeyCombo] = useState<string[]>([]);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Cancel shortcut if key is being held down
      if (event.repeat) {
        return null;
      }

      // Don't enable shortcuts in inputs unless explicitly declared
      if (options.disableTextInputs && isTextInput(event)) {
        return event.stopPropagation();
      }

      // Handle combined modifier key shortcuts (e.g. pressing Control + D)
      if (shortcut.includes('+')) {
        const keyArray = shortcut.split('+');

        // If the first key is a modifier, handle combinations
        if (isProperModifier(keyArray[0])) {
          const finalKey = keyArray.pop();

          // Run handler if the modifier(s) + key have both been pressed
          const checker = (k: string) => (isProperModifier(k) ? modifierMap[k](event) : false);
          if (keyArray.every(k => checker(k)) && finalKey === event.code) {
            return callbackRef.current(event);
          }
        } else {
          // If the shortcut doesn't begin with a modifier, it's a sequence
          if (keyArray[keyCombo.length] === event.code) {
            // Handle final key in the sequence
            if (keyArray[keyArray.length - 1] === event.code && keyCombo.length === keyArray.length - 1) {
              // Run handler if the sequence is complete, then reset it
              callbackRef.current(event);
              return setKeyCombo([]);
            }

            // Add to the sequence
            return setKeyCombo(prevCombo => [...prevCombo, event.code]);
          }
          if (keyCombo.length > 0) {
            // Reset key combo if it doesn't match the sequence
            return setKeyCombo([]);
          }
        }
      }

      // Single key shortcuts (e.g. pressing D)
      if (shortcut === event.code) {
        return callbackRef.current(event);
      }
    },
    [keyCombo.length, options.disableTextInputs, shortcut],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

function isTextInput(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  return (
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLInputElement && (!target.type || target.type === 'text')) ||
    target.isContentEditable
  );
}
