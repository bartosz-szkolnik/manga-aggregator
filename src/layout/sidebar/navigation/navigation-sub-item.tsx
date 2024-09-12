import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { NavigationLink } from './navigation-link';
import { CircleHelpIcon, type LucideIcon } from 'lucide-react';

export type NavigationSubItemProps = {
  title: string;
  url: string;
  icon?: LucideIcon;
  description?: string;
  countKey?: 'updated' | 'nextUp' | 'yourLibrary' | 'allManga';
  count?: number | null;
};

export function NavigationSubItem({ title, url, description, icon: Icon, count }: NavigationSubItemProps) {
  return (
    <li>
      <NavigationLink
        href={url}
        className="flex h-8 min-w-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
      >
        {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}
        <div className="flex flex-1 overflow-hidden">
          <div className="line-clamp-1 flex-1 pr-6">{title}</div>
          {count !== null && <span className="mr-1">{count}</span>}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-2">
                <CircleHelpIcon className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </NavigationLink>
    </li>
  );
}
