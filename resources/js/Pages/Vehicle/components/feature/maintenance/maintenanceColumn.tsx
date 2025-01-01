import { Button } from '@/shared/Components/ui/button';
import { IRootVehicleMaintenance } from '@/shared/models/vehicleInterfaces';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MaintenanceStatusBadge } from '../../Badge';

interface useGenerateMaintenanceColumnsProps {
  handleDeleteMaintenance: (maintenanceId: string) => void;
}

export const useGenerateMaintenanceColumns = ({
  handleDeleteMaintenance,
}: useGenerateMaintenanceColumnsProps) => {
  const maintenanceColumns: ColumnDef<IRootVehicleMaintenance>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'scheduled_date',
      header: 'Scheduled Date',
      cell: ({ row }) => {
        return <div>{format(row.original.scheduled_date, 'yyyy-mm-dd')}</div>;
      },
    },
    {
      accessorKey: 'maintenance_type',
      header: 'Maintenance Type',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <MaintenanceStatusBadge maintenanceStatus={row.original.status} />
        );
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
            onClick={() => handleDeleteMaintenance(row.original.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return maintenanceColumns;
};
