import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import { NavigationLink } from './navigation-link';
import { Button } from '@components/ui/button';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { NavigationSubItem, NavigationSubItemProps } from './navigation-sub-item';

export type NavigationItemProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  match?: string[];
  items: NavigationSubItemProps[];
};

export function NavigationItem(props: NavigationItemProps) {
  const { title, isActive, url, match, icon: Icon, disabled = false, items } = props;

  return (
    <Collapsible asChild defaultOpen={isActive}>
      <li>
        <div className="relative flex items-center">
          <NavigationLink href={url} disabled={disabled} match={match}>
            <Icon className="mr-2 h-4 w-4 shrink-0" />
            <div className="flex flex-1 overflow-hidden">
              <div className="line-clamp-1 pr-6">{title}</div>
            </div>
          </NavigationLink>

          {items.length > 0 && (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="absolute right-1 h-6 w-6 rounded-sm p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
        <CollapsibleContent className="py-2 pl-4">
          <ul className="grid gap-2 px-2">
            {items?.map(subItem => <NavigationSubItem key={subItem.title} {...subItem} />)}
          </ul>
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
}
