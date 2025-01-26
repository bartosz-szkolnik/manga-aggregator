import { useEffect, useState } from 'react';

type Data<T> =
  | {
      data: T;
      loading: false;
    }
  | {
      data: null;
      loading: true;
    };

// TODO: Fix this weird monad shit
// debounce is producing Promise<Promise<T>>
// which is imcopatible with just Promise<T> for some reason
type Fn<T> = (...params: string[]) => Promise<Promise<T>>;

export function useFetch<T>(urlOrFn: string | Fn<T>, ...params: string[]) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleUrl(url: string) {
      const data = await (await fetch(url)).json();
      setData(data);
      setLoading(false);
    }

    async function handleFn(fn: Fn<T>) {
      const data = await fn(...params);
      setData(data);
      setLoading(false);
    }

    if (typeof urlOrFn === 'string') {
      handleUrl(urlOrFn);
    } else {
      handleFn(urlOrFn);
    }
  }, [urlOrFn, params]);

  return { data, loading } as Data<T>;
}
