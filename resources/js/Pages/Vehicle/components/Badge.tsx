import { Badge } from '@/shared/Components/ui/badge';
import {
  MaintenanceStatusEnum,
  OwnershipTypeEnum,
  VehicleTypeEnum,
} from '@/shared/models/vehicleInterfaces';

export type VehicleTypeBadgeProps = {
  vehicleType: VehicleTypeEnum;
};

export type OwnershipTypeBadgeProps = {
  ownershipType: OwnershipTypeEnum;
};

export type MaintenanceStatusBadgeProps = {
  maintenanceStatus: MaintenanceStatusEnum;
};

const getBadgeVariantByVehicleType = (vehicleType: VehicleTypeEnum) => {
  switch (vehicleType) {
    case 'passenger':
      return 'secondary';
    default:
      return 'default';
  }
};

const getBadgeVariantByOwnershipType = (ownershipType: OwnershipTypeEnum) => {
  switch (ownershipType) {
    case 'company':
      return 'secondary';
    default:
      return 'default';
  }
};

const getBadgeVariantByMaintenanceStatus = (status: MaintenanceStatusEnum) => {
  switch (status) {
    case 'scheduled':
      return 'info';
    case 'in_progress':
      return 'warning';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'destructive';
    default:
      return 'default';
  }
};

export const VehicleTypeBadge = ({ vehicleType }: VehicleTypeBadgeProps) => {
  return (
    <Badge variant={getBadgeVariantByVehicleType(vehicleType)}>
      {vehicleType.toUpperCase()}
    </Badge>
  );
};

export const OwnershipTypeBadge = ({
  ownershipType,
}: OwnershipTypeBadgeProps) => {
  return (
    <Badge variant={getBadgeVariantByOwnershipType(ownershipType)}>
      {ownershipType.toUpperCase()}
    </Badge>
  );
};

export const MaintenanceStatusBadge = ({
  maintenanceStatus,
}: MaintenanceStatusBadgeProps) => {
  return (
    <Badge
      className="capitalize"
      variant={getBadgeVariantByMaintenanceStatus(maintenanceStatus)}
    >
      {maintenanceStatus.split('_').join(' ')}
    </Badge>
  );
};
