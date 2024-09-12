import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-3 flex h-[calc(100vh-1.5rem)] w-screen flex-col items-center justify-center rounded-md bg-white shadow-lg shadow-slate-400">
      {children}
    </div>
  );
}
