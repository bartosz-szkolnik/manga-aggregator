import { Game } from '@2048/components/game';
import { Metadata } from 'next';

export const metadata: Metadata = { title: '2048 Game' };

export default function Page() {
  return (
    <main className="flex justify-center overflow-y-hidden">
      <div className="mt-8 w-full max-w-[468px]">
        <Game />
      </div>
    </main>
  );
}
