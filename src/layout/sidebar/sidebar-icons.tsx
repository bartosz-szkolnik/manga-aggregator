'use client';

import { Button } from '@components/ui/button';
import { ChevronLeft, ChevronRight, Search, ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@components/ui/sidebar';
import { ThemeCustomizer } from '@layout/theme';

export function SidebarIcons({ defaultColor }: { defaultColor: string }) {
  const router = useRouter();
  const { setOpen } = useSidebar();

  return (
    <div className="contents">
      <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
        <ChevronsLeft></ChevronsLeft>
      </Button>
      <Button variant={'ghost'} size="icon" onClick={() => router.back()}>
        <ChevronLeft></ChevronLeft>
      </Button>
      <Button variant={'ghost'} size="icon" onClick={() => router.forward()}>
        <ChevronRight></ChevronRight>
      </Button>
      <Button disabled variant={'ghost'} size="icon">
        <Search />
      </Button>
      <ThemeCustomizer defaultColor={defaultColor} />
    </div>
  );
}
