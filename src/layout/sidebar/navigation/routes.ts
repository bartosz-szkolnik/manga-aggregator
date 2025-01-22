import {
  Settings,
  BookOpen,
  BellRing,
  ArrowDownAZ,
  Library,
  BookCopy,
  FolderLock,
  Contact,
  Bell,
  TvMinimalPlay,
  Home,
} from 'lucide-react';
import type { NavigationItemProps } from './navigation-item';

export const routes = {
  userNotLoggedIn: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [],
    },
    {
      title: 'Manga',
      url: '/manga',
      icon: BookOpen,
      defaultOpen: true,
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [
        {
          title: 'Browse',
          url: '/manga/browse?tab=grid',
          description: 'Browse all available mangas',
          icon: BookCopy,
        },
      ],
    },
  ] satisfies NavigationItemProps[],
  userLoggedIn: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [],
    },
    {
      title: 'Manga',
      url: '/manga',
      icon: BookOpen,
      defaultOpen: true,
      match: ['/updated', '/reading-now', '/your-library', '/browse'],
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [
        {
          title: 'Browse',
          url: '/manga/browse?tab=grid',
          description: 'Browse all available mangas',
          countKey: 'browse',
          icon: BookCopy,
        },
        {
          title: 'Updated',
          url: '/manga/updated?tab=grid',
          description: 'View mangas followed by you that have been updated since your last visit',
          countKey: 'updated',
          icon: BellRing,
        },
        {
          title: 'Reading Now',
          url: '/manga/reading-now?tab=grid',
          description: 'Browse mangas that you currently have marked as "Currently reading"',
          countKey: 'reading-now',
          icon: ArrowDownAZ,
        },
        {
          title: 'Your Library',
          url: '/manga/your-library?tab=grid',
          description: 'Browse all mangas in your Library',
          countKey: 'your-library',
          icon: Library,
        },
      ],
    },
    {
      title: 'Anime',
      url: '/anime',
      icon: TvMinimalPlay,
      items: [],
      isVisibleFor: ['admin'],
      disabled: true,
    },
    {
      title: 'Settings',
      icon: Settings,
      url: '/settings',
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
          description: 'Configure your profile settings',
          icon: Contact,
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          description: 'Configure your notifications settings',
          icon: Bell,
        },
      ],
    },
    {
      title: 'Management Dashboard',
      icon: FolderLock,
      items: [],
      url: '/dashboard',
      isVisibleFor: ['admin'],
    },
  ] satisfies NavigationItemProps[],
};
