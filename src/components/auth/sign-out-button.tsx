import { Button } from '@components/ui/button';

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form action="/auth/sign-out" method="post">
      <Button className={className} variant="ghost">
        Sign out
      </Button>
    </form>
  );
}
