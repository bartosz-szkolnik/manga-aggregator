'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../button';
import { Icons } from '../icons';

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pending?: boolean;
};

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, pending: customPending, className, disabled, ...props }, ref) => {
    const status = useFormStatus();
    const pending = status.pending || customPending;

    return (
      <Button {...props} ref={ref} className={className} disabled={disabled || pending}>
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {pending ? ' Loading...' : children}
      </Button>
    );
  },
);
SubmitButton.displayName = 'ActionButton';
