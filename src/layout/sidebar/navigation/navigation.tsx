import { ComponentProps } from 'react';
import { cn, exhaustiveCheck } from '@utils/utils';
import { createServerClient } from '@utils/supabase/server';
import { routes } from './routes';
import { SupabaseBrowserClient } from '@utils/supabase/client';
import { Profile } from '@lib/types/manga.types';
import { NavigationItem } from './navigation-item';
import { NavigationSubItemProps } from './navigation-sub-item';
import {
  getCurrentlyReadCount,
  getUpdatedMangasCount,
  getAllMangaInUserLibraryCount,
  getAllMangaCount,
} from '@lib/count-functions';

export type NavigationProps = ComponentProps<'ul'>;

export async function Navigation({ className }: NavigationProps) {
  const { supabase, userId, profile } = await createServerClient();

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

  const countValues = await getNavigationData(supabase, userId);
  const items = routes.userLoggedIn.map(item => ({
    ...item,
    items: item.items.map(subItem => ({
      ...subItem,
      count: getCountForItem(subItem, countValues),
    })),
  }));

  return (
    <nav>
      <ul className={cn('grid gap-0.5', className)}>
        {items.map(item => {
          return <NavigationItem key={item.title} {...item} profile={profile!}></NavigationItem>;
        })}
      </ul>
    </nav>
  );
}

function getNavigationData(supabase: SupabaseBrowserClient, userId: Profile['id']) {
  const args = [supabase, userId] as const;
  return Promise.all([
    getUpdatedMangasCount(...args),
    getCurrentlyReadCount(...args),
    getAllMangaInUserLibraryCount(...args),
    getAllMangaCount(...args),
  ]);
}

function getCountForItem(item: NavigationSubItemProps, countValues: Awaited<ReturnType<typeof getNavigationData>>) {
  if (!item.countKey) {
    return null;
  }

  const [updatedCount, nextUpCount, inLibraryCount, allMangaCount] = countValues;
  switch (item.countKey) {
    case 'updated':
      return updatedCount;
    case 'nextUp':
      return nextUpCount;
    case 'yourLibrary':
      return inLibraryCount;
    case 'allManga':
      return allMangaCount;
    default:
      exhaustiveCheck(item.countKey);
  }
}
