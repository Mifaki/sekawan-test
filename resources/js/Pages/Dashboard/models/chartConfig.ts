import { TBookingStatus } from '@/shared/models/bookinginterfaces';

export const chartConfig = {
  rejected: {
    label: 'Rejected',
    color: 'hsl(0, 84%, 60%)',
  },
  pending: {
    label: 'Pending',
    color: 'hsl(38, 92%, 50%)',
  },
  approved_l1: {
    label: 'Approved L1',
    color: 'hsl(142, 71%, 45%)',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(201, 96%, 32%)',
  },
} as const satisfies Record<TBookingStatus, { label: string; color: string }>;
