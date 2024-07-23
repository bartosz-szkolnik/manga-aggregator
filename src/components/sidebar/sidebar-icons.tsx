'use client';

import { Button } from '@components/ui/button';
import { PanelLeftDashed, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SidebarIconsProps = {
  setSidebarOpen: (open: boolean) => void;
};

export function SidebarIcons({ setSidebarOpen }: SidebarIconsProps) {
  const router = useRouter();

  return (
    <div className="mb-4 flex">
      <Button variant={'ghost'} onClick={() => setSidebarOpen(false)}>
        <PanelLeftDashed></PanelLeftDashed>
      </Button>
      <Button variant={'ghost'} onClick={() => router.back()}>
        <ChevronLeft></ChevronLeft>
      </Button>
      <Button variant={'ghost'} onClick={() => router.forward()}>
        <ChevronRight></ChevronRight>
      </Button>
      <Button variant={'ghost'} onClick={() => router.refresh()}>
        <RotateCw></RotateCw>
      </Button>
    </div>
  );
}
