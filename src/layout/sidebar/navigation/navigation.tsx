import { ComponentProps } from 'react';
import { cn, exhaustiveCheck } from '@utils/utils';
import { routes } from './routes';
import { Profile } from '@manga/types';
import { NavigationItem } from './navigation-item';
import { NavigationSubItemProps } from './navigation-sub-item';
import { fetchMangasToBrowseCount } from '@manga/lib/browse/data';
import { fetchReadingNowMangasCount } from '@manga/lib/reading-now/data';
import { fetchUpdatedMangasCount } from '@manga/lib/updated/data';
import { fetchMangasFromUserLibraryCount } from '@manga/lib/user-library/data';

export type NavigationProps = ComponentProps<'ul'> & {
  userId: string | undefined;
  profile?: Profile | null;
};

export async function Navigation({ className, userId, profile }: NavigationProps) {
  if (!userId) {
    return (
      <nav>
        <ul className={cn('grid gap-1', className)}>
          {routes.userNotLoggedIn.map(item => (
            <NavigationItem key={item.title} {...item} />
          ))}
        </ul>
      </nav>
    );
  }

  const countValues = await getNavigationData();
  const items = routes.userLoggedIn.map(item => ({
    ...item,
    items: item.items.map(subItem => ({
      ...subItem,
      count: getCountForItem(subItem, countValues),
    })),
  }));

  return (
    <nav>
      <ul className={cn('grid gap-1', className)}>
        {items.map(item => {
          return <NavigationItem key={item.title} {...item} profile={profile} />;
        })}
      </ul>
    </nav>
  );
}

function getNavigationData() {
  return Promise.all([
    fetchMangasToBrowseCount().then(({ count }) => count ?? 0),
    fetchReadingNowMangasCount().then(({ count }) => count ?? 0),
    fetchUpdatedMangasCount().then(({ count }) => count ?? 0),
    fetchMangasFromUserLibraryCount().then(({ count }) => count ?? 0),
  ]);
}

function getCountForItem(item: NavigationSubItemProps, countValues: Awaited<ReturnType<typeof getNavigationData>>) {
  if (!item.countKey) {
    return null;
  }

  const [browseCount, readingNowCount, updatedCount, inLibraryCount] = countValues;
  switch (item.countKey) {
    case 'browse':
      return browseCount;
    case 'updated':
      return updatedCount;
    case 'reading-now':
      return readingNowCount;
    case 'your-library':
      return inLibraryCount;
    default:
      exhaustiveCheck(item.countKey);
  }
}
