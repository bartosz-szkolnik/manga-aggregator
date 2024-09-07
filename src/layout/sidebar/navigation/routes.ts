import { HomeIcon, CatIcon, LockIcon, Settings } from 'lucide-react';
import { type NavigationItemProps } from './navigation';

export const routes = {
  userNotLoggedIn: [
    {
      title: 'Home',
      url: '/all-manga',
      icon: HomeIcon,
      isActive: true,
      match: ['/all-manga'],
      items: [],
    },
  ] satisfies NavigationItemProps[],
  userLoggedIn: [
    {
      title: 'Home',
      url: '/',
      icon: HomeIcon,
      isActive: true,
      match: ['/updated', '/currently-reading', '/your-library', '/all-manga'],
      items: [
        {
          title: 'Updated',
          url: '/updated',
          description: 'View mangas followed by you that have been updated since your last visit',
          countKey: 'updated',
        },
        {
          title: 'Next Up',
          url: '/currently-reading',
          description: 'Browse mangas that you currently have marked as "Currently reading"',
          countKey: 'nextUp',
        },
        {
          title: 'Your Library',
          url: '/your-library',
          description: 'Browse all mangas in your Library',
        },
        {
          title: 'All Available Manga',
          url: '/all-manga',
          description: 'Browse all available mangas',
        },
      ],
    },
    {
      title: 'Anime',
      url: '/anime',
      icon: CatIcon,
      items: [],
    },
    {
      title: 'Settings',
      icon: Settings,
      url: '/settings',
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
          description: 'Configure your profile settings',
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          description: 'Configure your notifications settings',
        },
      ],
    },
    {
      title: 'Management Dashboard',
      icon: LockIcon,
      items: [],
      url: '/dashboard',
    },
  ] satisfies NavigationItemProps[],
};
