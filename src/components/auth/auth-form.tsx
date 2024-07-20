'use client';

import { Button } from '@components/ui/button';
import { ErrorMessage, Form, FormControl, Input, Label } from '@components/ui/form';
import { Icons } from '@components/ui/icons';
import { cn } from '@utils/utils';
import { FormEvent, HTMLAttributes, useState, useTransition } from 'react';
import { ZodIssue } from 'zod';
import { authFormSchema } from './auth-form-schema';

type AuthFormProps = HTMLAttributes<HTMLDivElement> & {
  formAction: (data: { email: string; password: string }) => Promise<{ error: string }>;
};

export function AuthForm({ className, formAction, ...props }: AuthFormProps) {
  const [, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const { success, data, error } = authFormSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      setErrors(error.issues);
      setIsLoading(false);
      return;
    }

    startTransition(async () => {
      const { error } = await formAction(data);
      setIsLoading(false);
      // TODO: Create a better way to display the error
      console.info(error);
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form onSubmit={onSubmit} errors={errors} id="user-auth-form">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormControl controlName="email">
              <Label className="sr-only">Email</Label>
              <Input
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
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
                disabled={isLoading}
              />
              <ErrorMessage />
            </FormControl>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
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
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
    </div>
  );
}
