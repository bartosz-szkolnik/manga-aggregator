import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { ChevronRight } from 'lucide-react';

export function ShowMoreButton({ href }: { href: string }) {
  return (
    <Button className="h-[330px] w-[250px]" variant="outline">
      <Link href={href}>
        <div className="flex flex-col items-center justify-center gap-4">
          <ChevronRight className="h-16 w-16" />
          Show more
        </div>
      </Link>
    </Button>
  );
}
