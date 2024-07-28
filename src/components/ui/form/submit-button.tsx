'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../button';
import { Icons } from '../icons';

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, className, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Button {...props} ref={ref} className={className} disabled={pending}>
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {pending ? ' Loading...' : children}
      </Button>
    );
  },
);
SubmitButton.displayName = 'ActionButton';
