// Code taken from https://dev.to/bwca/create-a-debounce-function-from-scratch-in-typescript-560m
// Then slightly modified

import { DebouncedFunction, FunctionWithArguments } from './debounce-model';

export const DELAY_300MS = 300;

export function debounce<F extends FunctionWithArguments>(fn: F, delayInMs = DELAY_300MS) {
  let timer: ReturnType<typeof setTimeout>;

  const debouncedFn: DebouncedFunction<F> = (...args) =>
    new Promise(resolve => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(...(args as unknown[])));
      }, delayInMs);
    });

  const teardown = () => {
    clearTimeout(timer);
  };

  debouncedFn.teardown = teardown;
  return debouncedFn;
}
