'use client';

import { Input } from '@/src/components/ui/input';
import { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '../../../../components/shared/data-table/data-table-faceted-filter';
import { priorities, readingStatuses } from './data/data';
import { Button } from '@/src/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from '@/src/components/shared/data-table/data-table-view-options';

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter mangas..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event => {
            table.getColumn('title')?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('reading status') && (
          <DataTableFacetedFilter
            column={table.getColumn('reading status')}
            title="Reading status"
            options={readingStatuses.map(status => ({ ...status, value: String(status.value) }))}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter column={table.getColumn('priority')} title="Priority" options={priorities} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table}></DataTableViewOptions>
    </div>
  );
}
