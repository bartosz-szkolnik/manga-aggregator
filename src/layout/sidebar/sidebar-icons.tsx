'use client';

import { Button } from '@components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@components/ui/sidebar';
import { ThemeCustomizer } from '@layout/theme';
import { HelperDialogIcon } from '@lib/helper-dialog';
import { CommandPrompt } from '@components/command-prompt';

export function SidebarIcons({ defaultColor }: { defaultColor: string }) {
  const router = useRouter();
  const { setOpen } = useSidebar();

  return (
    <div className="contents">
      <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
        <ChevronsLeft />
      </Button>
      <Button variant={'ghost'} size="icon" onClick={() => router.back()}>
        <ChevronLeft />
      </Button>
      <Button variant={'ghost'} size="icon" onClick={() => router.forward()}>
        <ChevronRight />
      </Button>
      <CommandPrompt />
      <ThemeCustomizer defaultColor={defaultColor} />
      <HelperDialogIcon />
    </div>
  );
}
