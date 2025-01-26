import { Metadata } from 'next';
import { TablePaginationContrainer, TitleFilter } from '@lib/table';
import { fetchMangasForAdminDashboard } from '@admin-dashboard/lib/data';
import { AdminDashboardMangaTable } from '@admin-dashboard/components/table';
import { ServerError } from '@components/common/error/error.server';
import { Separator } from '@components/ui/separator';

export const metadata: Metadata = { title: 'Admin Dashboard' };

type AdminDashboardProps = {
  searchParams: Promise<{ page: string; size: string; filter: string }>;
};

export default async function AdminDashboardPage(props: AdminDashboardProps) {
  const params = await props.searchParams;
  const { error, data, size, page, amountOfPages, count } = await fetchMangasForAdminDashboard({ ...params });

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <main className="flex flex-col flex-wrap gap-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Here you can do everything.</p>
        </div>
      </div>
      <Separator />
      <div className="flex md:justify-between">
        Total: {count}
        <TitleFilter />
      </div>
      <AdminDashboardMangaTable data={data} />
      <TablePaginationContrainer amountOfPages={amountOfPages} page={page} filter={params.filter} size={size} />
    </main>
  );
}
