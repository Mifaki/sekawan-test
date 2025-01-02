export const PERMISSIONS = {
  EDIT_USERS: 'edit_users',
  VIEW_USERS: 'view_users',
  DOWNLOAD_USERS: 'download_users',
  VIEW_VEHICLES: 'view_vehicles',
  CREATE_VEHICLES: 'create_vehicles',
  EDIT_VEHICLES: 'edit_vehicles',
  DELETE_VEHICLES: 'delete_vehicles',
  DOWNLOAD_VEHICLES: 'download_vehicles',
  VIEW_VEHICLE_MAINTENANCES: 'view_vehicle_maintenances',
  CREATE_VEHICLE_MAINTENANCES: 'create_vehicle_maintenances',
  DELETE_VEHICLE_MAINTENANCES: 'delete_vehicle_maintenances',
  VIEW_VEHICLE_FUEL_HISTORIES: 'view_vehicle_fuel_histories',
  CREATE_VEHICLE_FUEL_HISTORIES: 'create_vehicle_fuel_histories',
  DELETE_VEHICLE_FUEL_HISTORIES: 'delete_vehicle_fuel_histories',
  CREATE_BOOKINGS: 'create_bookings',
  EDIT_BOOKINGS: 'edit_bookings',
  DELETE_BOOKINGS: 'delete_bookings',
  DOWNLOAD_BOOKINGS: 'download_bookings',
  DOWNLOAD_COMBINED: 'download_combined',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
