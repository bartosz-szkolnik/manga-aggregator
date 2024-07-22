'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils/utils';
import { FormControlContext } from './form-control';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  const controlName = useContext(FormControlContext);

  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} htmlFor={controlName} />;
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
