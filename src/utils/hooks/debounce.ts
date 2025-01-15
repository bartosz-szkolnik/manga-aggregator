'use client';

import { useEffect, useState } from 'react';

const DELAY_300MS = 300;

export function useDebounce<T>(value: T, delayInMs = DELAY_300MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMs);

    return () => clearTimeout(timer);
  }, [value, delayInMs]);

  return debouncedValue;
}
