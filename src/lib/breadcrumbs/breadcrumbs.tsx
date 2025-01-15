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

// TODO: This probably needs some work to avoid those hacks

export function Breadcrumbs() {
  const pathname = usePathname();
  const [, ...parts] = pathname.split('/');
  const last = parts.pop()!;

  // if we're at home page
  if (last === '') {
    return (
      <Breadcrumb className="ml-4 flex h-10 items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="ml-4 flex h-10 items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {parts.map((path, index, arr) => {
          const length = arr.length - index;
          const backString = Array.from({ length })
            .map(() => '../')
            .join('');

          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={backString + path}>{getBreadcrumbText(path)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
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
