import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen md:bg-gradient-to-r md:from-gradient-from md:to-gradient-to">
      <div className="m-3 flex h-[calc(100vh-1.5rem)] w-screen flex-col items-center justify-center rounded-md bg-background shadow-lg shadow-slate-400 dark:shadow-none">
        {children}
      </div>
    </div>
  );
}
