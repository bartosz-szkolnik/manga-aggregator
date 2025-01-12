import { CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from '@components/ui/command';
import { User, CreditCard, Settings, FileSearch, MessageCircle } from 'lucide-react';

export function CommandPromptHelpGroup() {
  return (
    <>
      <CommandGroup heading="Help">
        <CommandItem disabled>
          <FileSearch className="h-5 w-5" />
          <span>Search Docs…</span>
        </CommandItem>
        <CommandItem disabled>
          <MessageCircle className="h-5 w-5" />
          <span>Send Feedback…</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem disabled>
          <User />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem disabled>
          <CreditCard />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Settings />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </>
  );
}
