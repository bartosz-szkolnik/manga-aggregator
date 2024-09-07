import { ComponentProps } from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@utils/utils';
import { Button } from '@components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import { NavigationLink } from './navigation-link';
import { createServerClient } from '@utils/supabase/server';
import { routes } from './routes';
import { SupabaseBrowserClient } from '@utils/supabase/client';
import { Profile } from '@lib/types/manga.types';
import { getCurrentlyReadAmount, getUpdatedMangasAmount } from '@lib/count-functions';

export type NavigationProps = ComponentProps<'ul'>;

export async function Navigation({ className }: NavigationProps) {
  const { supabase, userId } = await createServerClient();

  if (!userId) {
    return (
      <nav>
        <ul className={cn('grid gap-0.5', className)}>
          {routes.userNotLoggedIn.map(item => (
            <NavigationItem key={item.title} {...item} />
          ))}
        </ul>
      </nav>
    );
  }

  const [updatedCount, nextUpCount] = await getNavigationData(supabase, userId);
  const items = routes.userLoggedIn.map(item => ({
    ...item,
    items: item.items.map(subItem => ({
      ...subItem,
      count:
        'countKey' in subItem && subItem.countKey === 'nextUp'
          ? nextUpCount
          : 'countKey' in subItem && subItem.countKey === 'updated'
            ? updatedCount
            : null,
    })),
  }));
  return (
    <nav>
      <ul className={cn('grid gap-0.5', className)}>
        {items.map(item => {
          return <NavigationItem key={item.title} {...item}></NavigationItem>;
        })}
      </ul>
    </nav>
  );
}

export type NavigationItemProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  match?: string[];
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    description?: string;
    countKey?: 'updated' | 'nextUp';
    count?: number | null;
  }[];
};

function NavigationItem({ title, isActive, url, match, icon: Icon, disabled = false, items }: NavigationItemProps) {
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

function NavigationSubItem({ title, url, description, icon: Icon, count }: NavigationItemProps['items'][number]) {
  return (
    <li>
      <NavigationLink
        href={url}
        className="flex h-8 min-w-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
      >
        {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}
        <div className="flex flex-1 overflow-hidden">
          <div className="line-clamp-1 flex-1 pr-6">{title}</div>
          {/* TODO Add some tooltip with description */}
          {count !== null && <span className="mr-1">{count}</span>}
        </div>
      </NavigationLink>
    </li>
  );
}

function getNavigationData(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  return Promise.all([getUpdatedMangasAmount(supabase, userId), getCurrentlyReadAmount(supabase, userId)]);
}
