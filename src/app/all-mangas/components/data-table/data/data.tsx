import type { CurrentReadingStatus, Priority } from '@/src/lib/types';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

type Icon = typeof ArrowDownIcon;

export const labels = [
  {
    value: 'isFinished',
    label: 'Finished',
  },
  {
    value: 'ongoing',
    label: 'Ongoing',
  },
  {
    value: 'hiatus',
    label: 'Hiatus',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
];

type ReadingStatuses = {
  label: string;
  value: CurrentReadingStatus | null | undefined;
  icon: Icon;
}[];

export const readingStatuses: ReadingStatuses = [
  {
    value: null,
    label: 'Not specified',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: undefined,
    label: 'Not in your Library',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'want to read',
    label: 'Want to read',
    icon: CircleIcon,
  },
  {
    value: 'reading',
    label: 'Currently reading',
    icon: StopwatchIcon,
  },
  {
    value: 'finished reading',
    label: 'Finished reading',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
];

type Priorities = {
  label: string;
  value: Priority;
  icon: Icon;
}[];

export const priorities: Priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
