import { Button } from './ui/button';

export function SignOutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button variant="ghost">Sign out</Button>
    </form>
  );
}
