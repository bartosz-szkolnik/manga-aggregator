'use client';

import { cn } from '@utils/utils';
import { createContext, ReactElement } from 'react';

type ControlType = 'text' | 'switch';

const formControlStyles: Record<ControlType, string> = {
  text: 'grid w-full items-center gap-2.5',
  switch: 'flex flex-row items-center justify-between rounded-lg border p-4',
};

export const FormControlContext = createContext('');

export function FormControl({
  children,
  controlName,
  controlType = 'text',
  className,
}: {
  children: ReactElement[];
  controlName: string;
  controlType?: ControlType;
  className?: string;
}) {
  return (
    <FormControlContext.Provider value={controlName}>
      <div className={cn(formControlStyles[controlType], className)}>{children}</div>
    </FormControlContext.Provider>
  );
}
