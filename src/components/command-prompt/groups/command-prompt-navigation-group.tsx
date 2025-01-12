import { CommandGroup, CommandItem } from '@components/ui/command';
import { MoveRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { closeCommandPromptResetPages } from '../command-prompt-reducer';
import { useCommandPrompt } from '../command-prompt-context';

type NavigationItem = {
  href: string;
  value: string;
  text: string;
};

const navigationItems = [
  {
    href: '/',
    value: 'home',
    text: 'Home',
  },
  {
    href: '/manga/browse',
    value: 'browse-manga',
    text: 'Browse Manga',
  },
  {
    href: '/manga/updated',
    value: 'updated-manga',
    text: 'Updated Manga',
  },
  {
    href: '/manga/reading-now',
    value: 'reading-now',
    text: 'Reading Now',
  },
  {
    href: '/manga/your-library',
    value: 'your-library',
    text: 'Your Library',
  },
  {
    href: '/settings/profile',
    value: 'profile-settings',
    text: 'Profile Settings',
  },
  {
    href: '/settings/notifications',
    value: 'notification-settings',
    text: 'Notification Settings',
  },
] satisfies NavigationItem[];

export function CommandPromptNavigation() {
  const { dispatch } = useCommandPrompt();

  return (
    <CommandGroup heading="Navigation">
      {navigationItems.map(({ href, value, text }) => (
        <CommandItem
          key={value}
          value={value}
          onSelect={() => {
            dispatch(closeCommandPromptResetPages());
            redirect(href);
          }}
        >
          <MoveRight />
          <span>
            Go to <strong>{text}</strong>
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
