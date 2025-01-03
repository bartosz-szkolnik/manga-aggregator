import { Metadata } from 'next';
import { logger } from '@utils/server/logger';
import { TablePageSizeSelect, TablePagination, TitleFilter } from '@lib/table';
import { fetchMangasForAdminDashboard } from '@admin-dashboard/lib/data';
import { AdminDashboardMangaTable } from '@admin-dashboard/components/table';

export const metadata: Metadata = { title: 'Admin Dashboard' };

type AdminDashboardProps = {
  searchParams: Promise<{ page: string; size: string; filter: string }>;
};

export default async function AdminDashboardPage(props: AdminDashboardProps) {
  const params = await props.searchParams;
  const { error, data, size, page, amountOfPages } = await fetchMangasForAdminDashboard({ ...params });

  if (error) {
    logger.error(error.message);
    return <p>Some kind of error occured</p>;
  }

  return (
    <div className="flex flex-col flex-wrap gap-8 px-4 py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Here you can do everything.</p>
        </div>
      </div>
      <div className="flex md:justify-end">
        <TitleFilter />
      </div>
      <AdminDashboardMangaTable data={data} />
      <div className="flex justify-end">
        <TablePagination amountOfPages={amountOfPages} page={page} filter={params.filter} size={size} />
        <TablePageSizeSelect size={size} />
      </div>
    </div>
  );
}
