import { formatToIDR } from '@/lib/utils';
import { Button } from '@/shared/Components/ui/button';
import { IRootVehicleFuel } from '@/shared/models/vehicleInterfaces';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

interface useGenerateFuelHistoryColumnsProps {
  handleDeleteFuelHistory: (maintenanceId: string) => void;
}

export const useGenerateFuelHistoryColumns = ({
  handleDeleteFuelHistory,
}: useGenerateFuelHistoryColumnsProps) => {
  const fuelHistoryColumns: ColumnDef<IRootVehicleFuel>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'driver_name',
      header: 'Driver Name',
    },
    {
      accessorKey: 'amount_liters',
      header: 'Amount Liters',
    },
    {
      accessorKey: 'cost',
      header: 'Cost',
      cell: ({ row }) => {
        return <div>Rp {formatToIDR(String(row.original.cost))}</div>;
      },
    },
    {
      accessorKey: 'refuel_date',
      header: 'Refuel Date',
      cell: ({ row }) => {
        return <div>{format(row.original.refuel_date, 'yyyy-mm-dd')}</div>;
      },
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => {
        return <div>{row.original.notes ? row.original.notes : '-'}</div>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={() => handleDeleteFuelHistory(row.original.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return fuelHistoryColumns;
};
