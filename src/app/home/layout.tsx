import { Sidebar } from '@/src/components/shared/sidebar';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="md:hidden">Not yet implemented</div>
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-5">
          <Sidebar lists={[]}></Sidebar>
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
