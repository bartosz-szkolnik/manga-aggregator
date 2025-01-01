import { buttonVariants } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { Manga } from '@manga/types';
import { cn } from '@utils/utils';

type OpenMangaDexButtonProps = {
  id?: Manga['id'];
  className?: string;
};

export function OpenMangaDexButton({ id, className }: OpenMangaDexButtonProps) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={`https://mangadex.org/${id ? `title/${id}` : ''}`}
      className={cn(buttonVariants({ variant: 'link' }), className)}
    >
      {id ? 'Open on MangaDex' : 'Go to MangaDex'}
    </Link>
  );
}
