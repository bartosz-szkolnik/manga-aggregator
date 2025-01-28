'use client';

import { cn } from '@utils/utils';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ReactNode } from 'react';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

function AnimatedCollapsibleContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <CollapsibleContent
      className={cn(
        'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
    >
      {children}
    </CollapsibleContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, AnimatedCollapsibleContent };
