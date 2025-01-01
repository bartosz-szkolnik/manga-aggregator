import { getTheCtrlSymbol, getTheMetaSymbol } from '@utils/common';

type MangaPageHeaderProps = {
  heading: string;
  subheading: string;
};

export function MangaPageHeader({ heading, subheading }: MangaPageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
      <p className="text-sm text-muted-foreground">{subheading}</p>
      <p className="mt-16">
        <strong className="text-sm text-muted-foreground">
          If you click with the {getTheMetaSymbol()}/{getTheCtrlSymbol()} button pressed, you can open any of them
          directly on MangaDex.
        </strong>
      </p>
    </div>
  );
}
