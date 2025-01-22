type MangaPageHeaderProps = {
  heading: string;
  subheading: string;
};

export function MangaPageHeader({ heading, subheading }: MangaPageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
      <p className="text-sm text-muted-foreground">{subheading}</p>
    </div>
  );
}
