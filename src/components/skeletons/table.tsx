import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/table';
import { Skeleton } from '@components/ui/skeleton';

export function MangaTableSkeleton() {
  return (
    <Table className="my-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px] min-w-[300px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Latest chapter</TableHead>
          <TableHead className="min-w-[100px]">How far you are</TableHead>
          <TableHead>Reading status</TableHead>
          <TableHead className="min-w-[200px] text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableCaption>All your favorite manga in one place.</TableCaption>
    </Table>
  );
}
