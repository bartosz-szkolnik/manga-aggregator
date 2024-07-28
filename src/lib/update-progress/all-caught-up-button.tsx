import { Button } from '@components/ui/button';
import { SubmitButton } from '@components/ui/form';

export function AllCaughtUpButton({ isCaughtUp }: { isCaughtUp: boolean }) {
  if (isCaughtUp) {
    return <Button disabled>You&apos;re all caught up</Button>;
  }

  return <SubmitButton>I&apos;m all caught up!</SubmitButton>;
}
