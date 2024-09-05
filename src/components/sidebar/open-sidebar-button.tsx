import { Button } from '@components/ui/button';
import { HandlerFn } from '@utils/types';
import { ChevronsRight } from 'lucide-react';

export function OpenSidebarButton({ openSidebar }: { openSidebar: HandlerFn }) {
  return (
    <Button className={'absolute left-2 top-6 hover:bg-transparent'} variant="ghost" onClick={openSidebar}>
      <ChevronsRight></ChevronsRight>
    </Button>
  );
}
