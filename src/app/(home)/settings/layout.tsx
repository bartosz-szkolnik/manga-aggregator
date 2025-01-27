import { SimpleLayoutSkeleton } from '@components/skeletons';
import { Separator } from '@components/ui/separator';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s · Manga Aggregator',
    default: 'Settings · Manga Aggregator',
  },
};

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-auto px-4 py-4 lg:px-8">
      <div className="h-full max-h-full">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex-1 lg:max-w-2xl">
          <Suspense fallback={<SimpleLayoutSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
