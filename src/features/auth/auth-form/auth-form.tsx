'use client';

import { HTMLAttributes } from 'react';
import { Button } from '@components/ui/button';
import { ErrorMessage, Form, FormControl, Input, Label } from '@components/ui/form';
import { Icons } from '@components/ui/icons';
import { cn } from '@utils/utils';
import { ZodIssue } from 'zod';
import { SubmitActionFn } from '@utils/types';
import { SubmitButton } from '@components/ui/form/submit-button';

type AuthFormProps = HTMLAttributes<HTMLDivElement> & {
  errors: ZodIssue[] | null;
  action: SubmitActionFn;
};

export function AuthForm({ className, action, errors, ...props }: AuthFormProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form action={action} errors={errors} id="user-auth-form">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormControl controlName="email">
              <Label className="sr-only">Email</Label>
              <Input placeholder="name@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
              <ErrorMessage />
            </FormControl>
            <FormControl controlName="password">
              <Label className="sr-only">Password</Label>
              <Input
                type="password"
                placeholder="******"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              <ErrorMessage />
            </FormControl>
          </div>
          <SubmitButton>Submit</SubmitButton>
        </div>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={true}>
        {false ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.gitHub className="mr-2 h-4 w-4" />}{' '}
        GitHub
      </Button>
    </div>
  );
}
