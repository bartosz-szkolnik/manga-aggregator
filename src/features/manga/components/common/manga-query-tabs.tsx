import { QueryTabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { TitleFilter } from '@lib/table';
import { LayoutGrid, Table } from 'lucide-react';
import { ReactNode } from 'react';

type MangaQueryTabsProps = {
  tab: string;
  count: number;
  children: ReactNode;
};

export function MangaQueryTabs({ tab, count, children }: MangaQueryTabsProps) {
  return (
    <QueryTabs defaultValue={tab} queryName="tab">
      <div className="mb-10 mt-6 flex flex-wrap items-center justify-between gap-8">
        <div className="flex flex-col justify-center gap-2">
          Total: {count}
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table className="mr-2 h-5 w-5" />
              Table
            </TabsTrigger>
          </TabsList>
        </div>
        <TitleFilter />
      </div>
      {children}
    </QueryTabs>
  );
}
