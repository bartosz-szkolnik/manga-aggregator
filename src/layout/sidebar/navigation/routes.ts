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
          url: '/manga/browse',
          description: 'Browse all available mangas',
          countKey: 'allManga' as const,
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
          url: '/manga/browse',
          description: 'Browse all available mangas',
          countKey: 'allManga' as const,
          icon: BookCopy,
        },
        {
          title: 'Updated',
          url: '/manga/updated',
          description: 'View mangas followed by you that have been updated since your last visit',
          countKey: 'updated' as const,
          icon: BellRing,
        },
        {
          title: 'Reading Now',
          url: '/manga/reading-now',
          description: 'Browse mangas that you currently have marked as "Currently reading"',
          countKey: 'nextUp' as const,
          icon: ArrowDownAZ,
        },
        {
          title: 'Your Library',
          url: '/manga/your-library',
          description: 'Browse all mangas in your Library',
          countKey: 'yourLibrary' as const,
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
