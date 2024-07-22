import { forwardRef, InputHTMLAttributes, useContext } from 'react';
import { cn } from '@utils/utils';
import { FormControlContext } from './form-control';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setFormAttributes?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, setFormAttributes = true, ...props }, ref) => {
    const controlName = useContext(FormControlContext);

    return (
      <input
        type={type}
        id={setFormAttributes ? controlName : undefined}
        name={setFormAttributes ? controlName : undefined}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
