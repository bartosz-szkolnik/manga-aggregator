import { ReactNode } from 'react';

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="m-5 flex max-h-[456px] min-h-[389px] w-[100%-40px] min-w-[300px] flex-wrap rounded-[6px] border-[7px] border-[#BBADA0] bg-[#BBADA0]">
      {children}
    </div>
  );
}
