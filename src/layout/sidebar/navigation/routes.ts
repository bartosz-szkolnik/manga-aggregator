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
} from 'lucide-react';
import type { NavigationItemProps } from './navigation-item';

export const routes = {
  userNotLoggedIn: [
    {
      title: 'Manga',
      url: '/all-manga',
      icon: BookOpen,
      isActive: true,
      match: ['/all-manga'],
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [
        {
          title: 'All Available Manga',
          url: '/all-manga',
          description: 'Browse all available mangas',
          countKey: 'allManga' as const,
          icon: BookCopy,
        },
      ],
    },
  ] satisfies NavigationItemProps[],
  userLoggedIn: [
    {
      title: 'Manga',
      url: '/',
      icon: BookOpen,
      isActive: true,
      match: ['/updated', '/currently-reading', '/your-library', '/all-manga'],
      isVisibleFor: ['admin', 'editor', 'viewer'],
      items: [
        {
          title: 'Updated',
          url: '/updated',
          description: 'View mangas followed by you that have been updated since your last visit',
          countKey: 'updated' as const,
          icon: BellRing,
        },
        {
          title: 'Next Up',
          url: '/currently-reading',
          description: 'Browse mangas that you currently have marked as "Currently reading"',
          countKey: 'nextUp' as const,
          icon: ArrowDownAZ,
        },
        {
          title: 'Your Library',
          url: '/your-library',
          description: 'Browse all mangas in your Library',
          countKey: 'yourLibrary' as const,
          icon: Library,
        },
        {
          title: 'All Available Manga',
          url: '/all-manga',
          description: 'Browse all available mangas',
          countKey: 'allManga' as const,
          icon: BookCopy,
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
