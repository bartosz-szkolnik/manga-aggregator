import { ComponentProps, forwardRef } from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { ButtonProps, buttonVariants } from '@components/ui/button';
import Link from 'next/link';
import { cn } from '@utils/utils';

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  disabled = false,
  children,
  ...props
}: PaginationLinkProps & { disabled?: boolean }) => {
  const classes = cn(buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }), className);
  if (isActive || disabled) {
    return (
      <span
        aria-current={isActive ? 'page' : undefined}
        className={cn('opacity-50', classes, 'cursor-default hover:bg-background')}
      >
        {children}
      </span>
    );
  }

  return (
    <Link aria-current={isActive ? 'page' : undefined} className={classes} {...props}>
      {children}
    </Link>
  );
};
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, disabled, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', disabled ? 'opacity-30' : '', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, disabled, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', disabled ? 'opacity-30' : '', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationLast = ({ className, disabled, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label="Go to last page"
    size="default"
    className={cn('gap-1 pl-2.5', disabled ? 'opacity-30' : '', className)}
    {...props}
  >
    <span>Last</span>
    <ChevronLast className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationFirst = ({ className, disabled, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label="Go to first page"
    size="default"
    className={cn('gap-1 pr-2.5', disabled ? 'opacity-30' : '', className)}
    {...props}
  >
    <ChevronFirst className="h-4 w-4" />
    <span>First</span>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationNext,
  PaginationPrevious,
  PaginationLast,
};
