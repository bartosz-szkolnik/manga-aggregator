'use client';

import { Button } from '@components/ui/button';
import { ReactElement, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { saveToCookies } from '@utils/cookies';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { Link } from '@components/ui/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';

const ONE_YEAR = 60 * 60 * 24 * 7 * 51;
const ONE_DAY = 60 * 60 * 24;

export function HelperDialog({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  function handleChange(open: boolean, duration = ONE_YEAR) {
    setOpen(open);
    saveToCookies('helper-modal', 'true', duration);
  }

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <HelperDialogContent
        ShowLaterButton={
          <Button type="button" variant="secondary" onClick={() => handleChange(false, ONE_DAY)}>
            Show me later!
          </Button>
        }
      />
    </Dialog>
  );
}

export function HelperDialogIcon() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <HelpCircle />
        </Button>
      </DialogTrigger>
      <HelperDialogContent ShowLaterButton={<div />} />
    </Dialog>
  );
}

function HelperDialogContent({ ShowLaterButton }: { ShowLaterButton: ReactElement }) {
  return (
    <DialogContent className="md:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Hello There!</DialogTitle>
        <DialogDescription className="text-md">
          {`Here's a quick FAQ for you. You can always open this dialog later via the icon in the sidebar.`}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-1">How to add a Manga?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-inside list-decimal space-y-2 text-justify leading-6">
                <li>
                  Go to{' '}
                  <Link className="underline" href="https://mangadex.org/" target="_blank" rel="noopener noreferrer">
                    MangaDex
                  </Link>
                </li>
                <li>Find any manga that you like and want to follow</li>
                <li>Copy the page URL (you can use ⌘/Ctrl+L and then ⌘/Ctrl+C)</li>
                <li>Come back to this app</li>
                <li>Register an account or log in</li>
                <li>
                  Press the &apos;Add Manga&apos; button (or press ⌘/Ctrl+A ), paste the url there, click
                  &apos;Continue...&apos; and await confirmation. The app should do the rest by itself (grab the title,
                  description and the rest and show it to you)
                </li>
                <li>
                  If you want to finish the process without following the Manga, just press the &apos;Save and
                  Close&apos; button
                </li>
                <li>
                  If you want to follow to Manga and to receive notifications when new chapters of this Manga arrive,
                  press the &apos;Save and Follow&apos; button and follow to the next section
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="mb-1">How to follow a Manga?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-inside list-decimal space-y-2 text-justify leading-6">
                <li>
                  You can follow a Manga in two different ways:
                  <ul className="ml-4 mt-2 list-inside list-disc space-y-2 leading-6">
                    <li>
                      First way is, when adding a new Manga, you can press &apos;Save and Follow&apos; button. Then
                      check the &apos;Start Following&apos; switch. You can also insert your progress of that manga so
                      the app will tell you how far behind you are. Then press &apos;Confirm&apos; button
                    </li>
                    <li>
                      Second way is to find a Manga that you want to follow in the All Available Manga section of the
                      app, press it&apos;s cover, then when a sidebar shows you Manga&apos;s details, you can press the
                      &apos;Add to Library&apos; and then press &apos;Follow&apos;. That&apos;s all.
                    </li>
                  </ul>
                </li>
                <li>
                  Go to the Notifications panel in the Settings, and check the Manga Updates switch (unfortunately
                  it&apos;s turned off by default)
                </li>
                <li>
                  From this point on the app will check if there&apos;s any new chapters according to the schedule
                  you&apos;ve provided and if they are, the app will notify you
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="mb-1">What are Singular Notifications?</AccordionTrigger>
            <AccordionContent>
              <p className="text-justify leading-6">
                When you follow a couple of mangas, and those mangas receive new chapters, you&apos;ll receive one
                combined notification about new things to read. When said notification is clicked, you&apos;ll be
                directed to the &apos;Updated for You&apos; page where you&apos;ll see all of the updates. But if you
                want to also receive notifications that a specific manga has been updated, mark it as your favorite. If
                you do, you&apos;ll also receive a notification about only this manga specifically. Said notification,
                when clicked, will take you to the manga page on MangaDex. Those notifications are called Singular
                Notifications. Remember to enable them in the Settings panel.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="mb-1">What are the key shortcuts?</AccordionTrigger>
            <AccordionContent>
              <p className="leading-6">You can use several shortcuts: </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-justify leading-6">
                <li>⌘/Ctrl+A - quickly open the &apos;Add Manga Dialog&apos;</li>
                <li>⌘/Ctrl+S - quickly open and close the sidebar</li>
                <li>And many more to come...</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <DialogFooter className="gap-2 sm:justify-end">
        {ShowLaterButton}
        <DialogClose asChild>
          <Button type="button">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
