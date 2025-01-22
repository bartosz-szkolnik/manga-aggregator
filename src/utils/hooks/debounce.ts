'use client';

import { useEffect, useRef, useState } from 'react';
import { debounce, DELAY_300MS, FunctionWithArguments } from '../debounce';

export function useDebounce<F extends FunctionWithArguments>(fn: F, delayInMs = DELAY_300MS) {
  const debounced = useRef(debounce(fn, delayInMs));
  useEffect(() => () => debounced.current.teardown(), [debounced]);
  return debounced.current;
}

// This is an unused version, kept only as a future reference for something?
// It works differently too
export function useDebounceOld<T>(value: T, delayInMs = DELAY_300MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMs);

    return () => clearTimeout(timer);
  }, [value, delayInMs]);

  return debouncedValue;
}
