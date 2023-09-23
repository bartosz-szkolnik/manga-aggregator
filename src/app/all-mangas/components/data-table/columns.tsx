'use client';

import { Checkbox } from '@/src/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { labels, priorities, readingStatuses } from './data/data';
import { Badge } from '@/src/components/ui/badge';
import { DataTableColumnHeader } from '../../../../components/shared/data-table/data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Manga, ProfileManga } from '@/src/lib/types';

type SingleManga = {
  id: Manga['id'];
  title: Manga['title'];
  is_completed: Manga['is_completed'];
  latest_chapter_no: Manga['latest_chapter_no'];
};

type Combined = ProfileManga & SingleManga;

type Data = Combined | SingleManga;

export const columns: ColumnDef<Data>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.original.is_completed ? (
            <Badge variant="outline">{labels[0].label}</Badge>
          ) : (
            <Badge variant="outline">{labels[1].label}</Badge>
          )}
          {hasProfileManga(row.original) && row.original.is_following && <Badge variant="outline">Following</Badge>}
          <span className="max-w-[500px] truncate font-medium">{row.getValue('title')}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'reading status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reading status" />,
    cell: ({ row }) => {
      if (!hasProfileManga(row.original)) {
        const status = readingStatuses.find(status => status.value === undefined)!;
        return (
          <div className="flex w-[100px] items-center">
            {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{status.label}</span>
          </div>
        );
      }

      const current = row.original.current_reading_status?.toLowerCase() ?? null;
      console.log(current);
      const status = readingStatuses.find(status => status.value === current)!;

      console.log(status);

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = priorities.find(priority => priority.value === row.getValue('priority'));

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'chapters',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reading progress" />,
    cell: ({ row }) => {
      const { latest_chapter_no } = row.original;
      if (!hasProfileManga(row.original)) {
        if (!latest_chapter_no) {
          return (
            <div className="flex items-center">
              <span>Not specified</span>
            </div>
          );
        }

        return (
          <div className="flex items-center">
            <span>? / {latest_chapter_no}</span>;
          </div>
        );
      }

      const { latest_chapter_read } = row.original;
      return (
        <div className="flex items-center">
          <span>
            {latest_chapter_read ?? '?'} / {latest_chapter_no ?? '?'}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

function hasProfileManga(data: Data): data is Combined {
  return Object.hasOwn(data, 'manga_id');
}
