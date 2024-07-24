import { buttonVariants } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { cn } from '@utils/utils';
import { ComponentType } from 'react';

export type SidebarProps = Readonly<{
  href: string;
  icon: ComponentType<{ className?: string }>;
  text: string;
  match?: string[];
  className?: string;
}>;

export function SidebarLink({ className, icon: Icon, text, ...props }: SidebarProps) {
  return (
    <Link {...props} className={buttonVariants({ variant: 'ghost', className: cn('w-full justify-start', className) })}>
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </Link>
  );
}
