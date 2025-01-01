import { Badge } from '@/shared/Components/ui/badge';
import { TBookingStatus } from '@/shared/models/bookinginterfaces';

export type BookingStatusBadgeProps = {
  status: TBookingStatus;
};

const getBadgeVariantByBookingStatus = (status: TBookingStatus) => {
  switch (status) {
    case 'approved_l1':
      return 'info';
    case 'pending':
      return 'warning';
    case 'completed':
      return 'success';
    case 'rejected':
      return 'destructive';
    default:
      return 'default';
  }
};

export const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  return (
    <Badge
      className="capitalize"
      variant={getBadgeVariantByBookingStatus(status)}
    >
      {status.split('_').join(' ')}
    </Badge>
  );
};
