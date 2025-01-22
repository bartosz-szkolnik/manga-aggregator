import { Metadata } from 'next';
import { Link } from '@components/ui/link';
import { cn } from '@utils/utils';
import { buttonVariants } from '@components/ui/button';
import { ArrowBigLeft, LogIn } from 'lucide-react';
import { SignUpForm } from '@auth/sign-up';
import { fetchProfile } from '@lib/profile/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ThemeCustomizer } from '@layout/theme';

export const metadata: Metadata = { title: 'Sign up' };

export default async function SignUpPage() {
  const cookie = await cookies();
  const defaultColor = cookie.get('color')?.value ?? 'zinc';

  const { profile } = await fetchProfile();
  if (profile) {
    redirect('/');
  }

  return (
    <div className="container relative grid h-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <div className="flex gap-4">
          <ThemeCustomizer defaultColor={defaultColor} buttonVariant="outline" />
          <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
            <ArrowBigLeft className="mr-2 h-5 w-5" />
            Go back to app
          </Link>
          <Link href="/auth/sign-in" className={cn(buttonVariants({ variant: 'default' }))}>
            <LogIn className="mr-2 h-5 w-5" />
            Sign in
          </Link>
        </div>
      </div>
      <div className="relative hidden h-full flex-col rounded-md bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 rounded-l-md bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Manga Aggregator
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The time you enjoy wasting <br />
              <span className="italic">Is not time wasted</span>.&rdquo;
            </p>
            <footer className="text-sm">Bertrand Russell</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your email and password below to create your account</p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
