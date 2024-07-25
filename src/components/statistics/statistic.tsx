import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { ComponentType, ReactNode } from 'react';

type StatisticProps = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
};

export function Statistic({ children, icon: Icon, title }: StatisticProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
