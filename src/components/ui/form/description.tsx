import { forwardRef, HTMLAttributes, useContext } from 'react';
import { cn } from '@utils/utils';
import { FormControlContext } from './form-control';

export const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const controlName = useContext(FormControlContext);

    return <p ref={ref} id={controlName} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  },
);
Description.displayName = 'Description';
