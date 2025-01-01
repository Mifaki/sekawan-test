import { Badge } from '@/shared/Components/ui/badge';
import { Button } from '@/shared/Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/Components/ui/dropdown-menu';
import { Separator } from '@/shared/Components/ui/separator';
import { IRootVehicle } from '@/shared/models/vehicleInterfaces';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { OwnershipTypeBadge, VehicleTypeBadge } from './Badge';

interface UseGenerateColumnsProps {
  handleEdit?: (vehicle: IRootVehicle) => void;
  handleMaintenance?: (vehicle: IRootVehicle) => void;
  handleFuel?: (vehicle: IRootVehicle) => void;
  handleDeleteVehicle?: (vehicleId: string) => void;
}

export const useGenerateColumns = ({
  handleEdit,
  handleMaintenance,
  handleFuel,
  handleDeleteVehicle,
}: UseGenerateColumnsProps) => {
  const columns: ColumnDef<IRootVehicle>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'registration_number',
      header: 'Registration Number',
    },
    {
      accessorKey: 'vehicle_type',
      header: 'Vehicle Type',
      cell: ({ row }) => {
        return <VehicleTypeBadge vehicleType={row.original.vehicle_type} />;
      },
    },
    {
      accessorKey: 'ownership_type',
      header: 'Ownership Type',
      cell: ({ row }) => {
        return (
          <OwnershipTypeBadge ownershipType={row.original.ownership_type} />
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Badge variant={row.original.is_active ? 'default' : 'destructive'}>
            {' '}
            {row.original.is_active ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        const vehicle = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8">
                Actions
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {handleEdit && (
                <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                  Edit
                </DropdownMenuItem>
              )}
              <Separator />
              {handleMaintenance && (
                <DropdownMenuItem onClick={() => handleMaintenance(vehicle)}>
                  Maintenance History
                </DropdownMenuItem>
              )}
              {handleFuel && (
                <DropdownMenuItem onClick={() => handleFuel(vehicle)}>
                  Fuel History
                </DropdownMenuItem>
              )}
              <Separator />
              {handleDeleteVehicle && (
                <DropdownMenuItem
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  className="text-red-500 hover:text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
