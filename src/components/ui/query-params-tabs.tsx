'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';
import { Tabs } from './tabs';

const QUERY_PARAMS_TAB_KEY = 'tab';

type QueryParamsTabs = {
  children: ReactNode;
  defaultValue: string;
  className?: string;
};

export function QueryParamsTabs({ children, defaultValue, ...props }: QueryParamsTabs) {
  const searchParams = useSearchParams();
  const [, value] = searchParams.toString().split(`${QUERY_PARAMS_TAB_KEY}=`);

  const [tab, setTab] = useState(value ?? defaultValue);
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function handleTabChange(value: string) {
    setTab(value);
    router.replace(pathname + '?' + createQueryString(QUERY_PARAMS_TAB_KEY, value));
  }

  return (
    <Tabs {...props} value={tab} onValueChange={handleTabChange}>
      {children}
    </Tabs>
  );
}
