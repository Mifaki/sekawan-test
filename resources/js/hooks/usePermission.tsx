import { Permission, PERMISSIONS } from '@/shared/models/permissioninterfaces';
import { useMemo } from 'react';

interface PermissionState {
  canEditUsers: boolean;
  canViewUsers: boolean;
  canDownloadUsers: boolean;
  canViewVehicles: boolean;
  canCreateVehicles: boolean;
  canEditVehicles: boolean;
  canDeleteVehicles: boolean;
  canDownloadVehicles: boolean;
  canViewVehicleMaintenances: boolean;
  canCreateVehicleMaintenances: boolean;
  canDeleteVehicleMaintenances: boolean;
  canViewVehicleFuelHistories: boolean;
  canCreateVehicleFuelHistories: boolean;
  canDeleteVehicleFuelHistories: boolean;
  canCreateBookings: boolean;
  canEditBookings: boolean;
  canDeleteBookings: boolean;
  canDownloadBookings: boolean;
  canDownloadCombined: boolean;
  hasPermission: (permission: Permission) => boolean;
}

export function usePermissions(
  permissions: Permission[] = []
): PermissionState {
  return useMemo(() => {
    const hasPermission = (permission: Permission) =>
      permissions.includes(permission);

    return {
      canEditUsers: hasPermission(PERMISSIONS.EDIT_USERS),
      canViewUsers: hasPermission(PERMISSIONS.VIEW_USERS),
      canDownloadUsers: hasPermission(PERMISSIONS.DOWNLOAD_USERS),
      canViewVehicles: hasPermission(PERMISSIONS.VIEW_VEHICLES),
      canCreateVehicles: hasPermission(PERMISSIONS.CREATE_VEHICLES),
      canEditVehicles: hasPermission(PERMISSIONS.EDIT_VEHICLES),
      canDeleteVehicles: hasPermission(PERMISSIONS.DELETE_VEHICLES),
      canDownloadVehicles: hasPermission(PERMISSIONS.DOWNLOAD_VEHICLES),
      canViewVehicleMaintenances: hasPermission(
        PERMISSIONS.VIEW_VEHICLE_MAINTENANCES
      ),
      canCreateVehicleMaintenances: hasPermission(
        PERMISSIONS.CREATE_VEHICLE_MAINTENANCES
      ),
      canDeleteVehicleMaintenances: hasPermission(
        PERMISSIONS.DELETE_VEHICLE_MAINTENANCES
      ),
      canViewVehicleFuelHistories: hasPermission(
        PERMISSIONS.VIEW_VEHICLE_FUEL_HISTORIES
      ),
      canCreateVehicleFuelHistories: hasPermission(
        PERMISSIONS.CREATE_VEHICLE_FUEL_HISTORIES
      ),
      canDeleteVehicleFuelHistories: hasPermission(
        PERMISSIONS.DELETE_VEHICLE_FUEL_HISTORIES
      ),
      canCreateBookings: hasPermission(PERMISSIONS.CREATE_BOOKINGS),
      canEditBookings: hasPermission(PERMISSIONS.EDIT_BOOKINGS),
      canDeleteBookings: hasPermission(PERMISSIONS.DELETE_BOOKINGS),
      canDownloadBookings: hasPermission(PERMISSIONS.DOWNLOAD_BOOKINGS),
      canDownloadCombined: hasPermission(PERMISSIONS.DOWNLOAD_COMBINED),
      hasPermission,
    };
  }, [permissions]);
}
