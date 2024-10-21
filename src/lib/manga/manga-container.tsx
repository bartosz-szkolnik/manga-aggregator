import { ReactNode } from 'react';

type MangaContainerProps = {
  children: ReactNode;
};

export function MangaContainer({ children }: MangaContainerProps) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 pb-4 md:gap-4">{children}</div>;
}
