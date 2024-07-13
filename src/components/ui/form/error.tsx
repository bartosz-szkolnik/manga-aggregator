import { useContext } from 'react';
import { FormContext } from './form';
import { cn } from '@utils/utils';

export function ErrorMessage({ id, className }: { id?: string; className?: string }) {
  const errors = useContext(FormContext);

  const error = errors.find(error => error.path.includes(id!));
  if (!error) {
    return null;
  }

  return <p className={cn('text-sm font-medium text-destructive', className)}>{error.message}</p>;
}
ErrorMessage.displayName = 'ErrorMessage';
