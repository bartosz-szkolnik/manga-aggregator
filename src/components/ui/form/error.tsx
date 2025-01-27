import { useContext } from 'react';
import { FormContext } from './form';
import { cn } from '@utils/utils';
import { FormControlContext } from './form-control';

export function ErrorMessage({ className }: { className?: string }) {
  const errors = useContext(FormContext);
  const controlName = useContext(FormControlContext);

  const error = errors.find(error => error.path.includes(controlName));
  if (!error) {
    return null;
  }

  return (
    <p aria-live="polite" className={cn('text-sm font-medium text-destructive', className)}>
      {error.message}
    </p>
  );
}
