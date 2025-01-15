'use client';

import { PageSizeSelect } from '@components/table';
import { FormControl, Label } from '@components/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function TablePageSizeSelect({ size }: { size: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('size')) {
      params.set('size', '10');
    }

    router.replace(`${pathname}?${params}`);
  }, [pathname, router, searchParams]);

  return (
    <FormControl className="w-[100px]" controlName="page-size">
      <Label>Page size</Label>
      <PageSizeSelect size={String(size)} />
    </FormControl>
  );
}
