'use client';

import { createContext, forwardRef, InputHTMLAttributes } from 'react';
import { ZodIssue } from 'zod';

export interface FormProps extends InputHTMLAttributes<HTMLFormElement> {
  errors: ZodIssue[] | null;
  action?: (formData: FormData) => void;
}

export const FormContext = createContext<ZodIssue[]>([]);

export const Form = forwardRef<HTMLFormElement, FormProps>(({ children, errors, ...props }, ref) => (
  <FormContext.Provider value={errors ?? []}>
    <form ref={ref} {...props}>
      {children}
    </form>
  </FormContext.Provider>
));

Form.displayName = 'Form';
