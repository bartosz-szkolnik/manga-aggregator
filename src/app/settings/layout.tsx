import { Separator } from '@components/ui/separator';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Settings · Manga Aggregator',
};

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full max-h-full space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="max-h-[81%] flex-1 lg:max-w-2xl">{children}</div>
    </main>
  );
}
