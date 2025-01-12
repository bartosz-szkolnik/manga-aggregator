import { CommandItem } from '@components/ui/command';
import { useCommandPrompt } from './command-prompt-context';
import { LogOut } from 'lucide-react';
import { openSignOutModal } from './command-prompt-reducer';

export function CommandPromptSignOut() {
  const { dispatch } = useCommandPrompt();

  return (
    <CommandItem value="sign-out" onSelect={() => dispatch(openSignOutModal())}>
      <LogOut className="h-5 w-5" />
      <span>Sign Out…</span>
    </CommandItem>
  );
}
