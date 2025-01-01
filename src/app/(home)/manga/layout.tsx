import { ReactNode } from 'react';

export default async function MangaLayout({ children }: { children: ReactNode }) {
  return <div className="overflow-auto px-4 py-4 lg:px-8">{children}</div>;
}
