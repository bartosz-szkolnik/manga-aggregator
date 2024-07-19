'use client';

import { ButtonHTMLAttributes, forwardRef, useState, useTransition, MouseEvent } from 'react';
import { Button } from './button';
import { Icons } from './icons';

export type ActionButtonProps<T = void> = ButtonHTMLAttributes<HTMLButtonElement> & {
  actionFn?: (event?: MouseEvent<HTMLButtonElement>) => Promise<T>;
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, className, actionFn, form }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [, startTransition] = useTransition();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setIsLoading(true);

      startTransition(async () => {
        setIsLoading(false);
        actionFn?.(event);
      });
    };

    if (form) {
      return (
        <Button ref={ref} className={className} form={form}>
          {children}
        </Button>
      );
    }

    return (
      <Button ref={ref} className={className} disabled={isLoading} onClick={handleClick}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  },
);
ActionButton.displayName = 'ActionButton';
