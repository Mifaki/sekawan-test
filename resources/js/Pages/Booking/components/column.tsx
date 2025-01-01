import { formatDateTime } from '@/lib/utils';
import { Badge } from '@/shared/Components/ui/badge';
import { Button } from '@/shared/Components/ui/button';
import { IRootBooking } from '@/shared/models/bookinginterfaces';
import { ColumnDef } from '@tanstack/react-table';
import { BookingStatusBadge } from './Badge';

interface useGenerateColumnsProps {
  handleAuthorize: (booking: IRootBooking) => void;
}

export const useGenerateColumns = ({
  handleAuthorize,
}: useGenerateColumnsProps) => {
  const columns: ColumnDef<IRootBooking>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'vehicle_registration_number',
      header: 'Registration Number',
    },
    {
      accessorKey: 'driver_name',
      header: 'Driver Name',
    },
    {
      accessorKey: 'start_datetime',
      header: 'Start Date/Time',
      cell: ({ row }) => {
        return <div>{formatDateTime(row.original.start_datetime)}</div>;
      },
    },
    {
      accessorKey: 'end_datetime',
      header: 'End Date/Time',
      cell: ({ row }) => {
        return <div>{formatDateTime(row.original.end_datetime)}</div>;
      },
    },
    {
      accessorKey: 'destination',
      header: 'Destination',
    },
    {
      accessorKey: 'requester_name',
      header: 'Requested By',
    },
    {
      accessorKey: 'relation',
      header: 'Your Role',
      cell: ({ row }) => {
        const roles = row.getValue('relation') as string[];

        if (!roles || roles.length === 0) {
          <div className="text-center text-lg">No Role</div>;
        }

        return (
          <div className="flex flex-wrap gap-1">
            {roles.map((role, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {role}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <BookingStatusBadge status={row.original.status} />;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <Button
            size={'sm'}
            onClick={() => handleAuthorize(row.original)}
            disabled={
              row.original.status === 'completed' ||
              row.original.status === 'rejected'
            }
          >
            Authorize
          </Button>
        );
      },
    },
  ];

  return columns;
};
