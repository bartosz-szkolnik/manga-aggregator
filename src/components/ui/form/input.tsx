'use client';

import { forwardRef, InputHTMLAttributes, useContext } from 'react';
import { cn } from '@utils/utils';
import { FormControlContext } from './form-control';
import { useFormStatus } from 'react-dom';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setFormAttributes?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, setFormAttributes = true, name, ...props }, ref) => {
    const controlName = useContext(FormControlContext);
    const { pending } = useFormStatus();

    return (
      <input
        {...props}
        type={type}
        id={setFormAttributes ? controlName : undefined}
        name={setFormAttributes ? controlName : name}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        disabled={pending}
        ref={ref}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
