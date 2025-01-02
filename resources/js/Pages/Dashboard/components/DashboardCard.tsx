import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/Components/ui/card';

interface IDashboardCard {
  title: string;
  description?: string;
  children: React.ReactNode;
  cardFooer?: React.ReactNode;
  className?: string;
}

const DashboardCard = ({
  title,
  description,
  children,
  className,
  cardFooer,
}: IDashboardCard) => {
  return (
    <Card className={cn('min-w-300px', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {cardFooer && (
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
