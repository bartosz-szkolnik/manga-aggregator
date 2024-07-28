import { createContext, InputHTMLAttributes } from 'react';
import { ZodIssue } from 'zod';

export interface FormProps extends InputHTMLAttributes<HTMLFormElement> {
  errors: ZodIssue[] | null;
  action?: (formData: FormData) => void;
}

export const FormContext = createContext<ZodIssue[]>([]);

export function Form({ children, errors, ...props }: FormProps) {
  return (
    <FormContext.Provider value={errors ?? []}>
      <form {...props}>{children}</form>
    </FormContext.Provider>
  );
}
