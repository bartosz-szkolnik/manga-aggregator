import { Link } from '@components/ui/link';

export function Footer() {
  return (
    <p className="w-full truncate text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Bartosz Szkolnik Software.
      <br />
      All rights reserved.
      <br />
      Build by Bartosz Szkolnik
      <br />
      Manga&apos;s data is taken from{' '}
      <Link className="underline" href="https://mangadex.org/" target="_blank" rel="noopener noreferrer">
        Mangadex.org
      </Link>
    </p>
  );
}
