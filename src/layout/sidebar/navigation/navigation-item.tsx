import { NavigationLink } from './navigation-link';
import { type LucideIcon } from 'lucide-react';
import { NavigationSubItem, NavigationSubItemProps } from './navigation-sub-item';
import { Profile, Role } from '@manga/types';
import { NavigationDropdownButton } from './navigation-dropdown-button';

export type NavigationItemProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  disabled?: boolean;
  match?: string[];
  isVisibleFor?: Role[];
  items: NavigationSubItemProps[];
};

export async function NavigationItem(props: NavigationItemProps & { profile?: Profile | null }) {
  const { title, url, match, icon: Icon, disabled = false, defaultOpen = false, items, profile, isVisibleFor } = props;

  if (!isVisibleFor?.includes(profile?.role ?? 'viewer')) {
    return null;
  }

  return (
    <li>
      {items.length > 0 ? (
        <NavigationDropdownButton
          defaultOpen={defaultOpen}
          icon={<Icon className="mr-2 h-4 w-4 shrink-0" />}
          text={title}
          match={match}
          href={url}
        >
          {items?.map(subItem => <NavigationSubItem key={subItem.title} {...subItem} />)}
        </NavigationDropdownButton>
      ) : (
        <NavigationLink
          href={url}
          disabled={disabled}
          match={match}
          className="hover:bg-gradient-from-hover hover:text-accent-foreground"
        >
          <Icon className="mr-2 h-4 w-4 shrink-0" />
          <div className="flex flex-1 overflow-hidden">
            <span className="line-clamp-1 grow pr-6">{title}</span>
          </div>
        </NavigationLink>
      )}
    </li>
  );
}
