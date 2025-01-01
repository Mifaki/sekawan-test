import { IGeneralApiResponse } from './generalinterfaces';

export type VehicleTypeEnum = 'cargo' | 'passenger';
export type OwnershipTypeEnum = 'company' | 'rental';
export type MaintenanceStatusEnum =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface IRootVehicle {
  id: string;
  registration_number: string;
  vehicle_type: VehicleTypeEnum;
  ownership_type: OwnershipTypeEnum;
  brand: string;
  model: string;
  manufacturing_year: string;
  chassis_number: string;
  engine_number: string;
  registration_expiry: string;
  is_active: boolean;
}

export interface IUpdateVehiclePayloadRoot {
  id: string;
  registration_number: string;
  vehicle_type: VehicleTypeEnum;
  ownership_type: OwnershipTypeEnum;
  brand: string;
  model: string;
  manufacturing_year: string;
  chassis_number: string;
  engine_number: string;
  registration_expiry: string;
  is_active: boolean;
}

export interface IUpdateVehicleResponseRoot extends IGeneralApiResponse {
  vehicle: IRootVehicle;
}

export interface ICreateVehiclePayloadRoot {
  registration_number: string;
  vehicle_type: VehicleTypeEnum;
  ownership_type: OwnershipTypeEnum;
  brand: string;
  model: string;
  manufacturing_year: string;
  chassis_number: string;
  engine_number: string;
  registration_expiry: string;
  is_active: boolean;
}

export interface ICreateVehicleResponseRoot extends IGeneralApiResponse {
  vehicle: IRootVehicle;
}

export interface IRootVehicleMaintenance {
  id: string;
  vehicle_id: string;
  scheduled_date: string;
  maintenance_type: string;
  description: string;
  status: MaintenanceStatusEnum;
}

export interface IAllVehicleMaintenanceRootResponse
  extends IGeneralApiResponse {
  maintenance: IRootVehicleMaintenance[];
}

export interface ICreateVehicleMaintenancePayloadRoot {
  vehicle_id: string;
  scheduled_date: string;
  maintenance_type: string;
  description: string;
  status: MaintenanceStatusEnum;
}

export interface ICreateVehicleMaintenanceResponseRoot
  extends IGeneralApiResponse {
  maintenance: IRootVehicleMaintenance;
}

export interface IRootVehicleFuel {
  id: string;
  vehicle_id: string;
  driver_name: string;
  amount_liters: number;
  cost: number;
  refuel_date: string;
  notes?: string;
}

export interface IAllVehicleFuelResponseRoot extends IGeneralApiResponse {
  fuel_histories: IRootVehicleFuel[];
}

export interface ICreateVehicleFuelHistoryPayloadRoot {
  vehicle_id: string;
  amount_liters: number;
  cost: number;
  refuel_date: string;
  notes?: string;
}

export interface ICreateVehicleFuelHistoryResponseRoot
  extends IGeneralApiResponse {
  fuel_history: IRootVehicleFuel;
}
