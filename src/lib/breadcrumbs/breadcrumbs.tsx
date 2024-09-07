'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumbs';
import { capitalizeFirstLetter } from '@utils/utils';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const [, ...parts] = pathname.split('/');
  const last = parts.pop()!;

  return (
    <Breadcrumb className="ml-4 flex h-10 items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {parts.map(path => (
          <Fragment key={path}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'../' + path}>{getBreadcrumbText(path)}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{getBreadcrumbText(last)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function getBreadcrumbText(value: string) {
  return capitalizeFirstLetter(value).replaceAll('-', ' ');
}
