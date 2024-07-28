import { SubmitActionFn } from '@utils/types';
import { SubmitButton } from './submit-button';
import { ReactNode } from 'react';

type ActionButtonProps = {
  submitAction: SubmitActionFn;
  className?: string;
  children: ReactNode;
};

export function ActionButton({ submitAction, className, children }: ActionButtonProps) {
  return (
    <form action={submitAction} className="contents">
      <SubmitButton className={className}>{children}</SubmitButton>
    </form>
  );
}
