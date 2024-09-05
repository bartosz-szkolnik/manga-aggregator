export function Footer() {
  return (
    <p className="w-full truncate text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Bartosz Szkolnik Software.
      <br />
      All rights reserved.
      <br />
      Build by Bartosz Szkolnik
    </p>
  );
}
