import { cn } from '@utils/utils';
import { Children, cloneElement, ReactElement } from 'react';

type ControlType = 'text' | 'switch';

const formControlStyles: Record<ControlType, string> = {
  text: 'grid w-full items-center gap-2.5',
  switch: 'flex flex-row items-center justify-between rounded-lg border p-4',
};

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
    <div className={cn(formControlStyles[controlType], className)}>
      {Children.map(children, child => {
        const type = child.type as unknown as { displayName: string };
        if (type.displayName === 'Label') {
          return cloneElement(child, {
            htmlFor: controlName,
          });
        }

        if (type.displayName === 'Input' || type.displayName === 'Switch') {
          return cloneElement(child, {
            id: controlName,
            name: controlName,
          });
        }

        if (type.displayName === 'Select') {
          return cloneElement(child, {
            name: controlName,
          });
        }

        if (type.displayName === 'ErrorMessage') {
          return cloneElement(child, {
            id: controlName,
          });
        }

        return child;
      })}
    </div>
  );
}
