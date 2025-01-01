import { IGeneralApiResponse } from '../models/generalinterfaces';
import {
  IAllVehicleFuelResponseRoot,
  IAllVehicleMaintenanceRootResponse,
  ICreateVehicleFuelHistoryPayloadRoot,
  ICreateVehicleFuelHistoryResponseRoot,
  ICreateVehicleMaintenancePayloadRoot,
  ICreateVehicleMaintenanceResponseRoot,
  ICreateVehiclePayloadRoot,
  ICreateVehicleResponseRoot,
  IUpdateVehiclePayloadRoot,
  IUpdateVehicleResponseRoot,
} from '../models/vehicleInterfaces';
import { ApiClass } from './generalApi';

class VehicleService extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async createVehicle(
    payload: ICreateVehiclePayloadRoot
  ): Promise<ICreateVehicleResponseRoot> {
    const { data } = await this.axiosInstance.post<ICreateVehicleResponseRoot>(
      `/vehicles`,
      payload
    );

    return data;
  }

  public async updateVehicle(
    id: string,
    payload: IUpdateVehiclePayloadRoot
  ): Promise<IUpdateVehicleResponseRoot> {
    const { data } = await this.axiosInstance.patch<IUpdateVehicleResponseRoot>(
      `/vehicles/${id}`,
      payload
    );

    return data;
  }

  public async deleteVehicle(id: string): Promise<IGeneralApiResponse> {
    const { data } = await this.axiosInstance.delete<IGeneralApiResponse>(
      `/vehicles/${id}`
    );

    return data;
  }

  public async getMaintenanceById(
    id: string
  ): Promise<IAllVehicleMaintenanceRootResponse> {
    const { data } =
      await this.axiosInstance.get<IAllVehicleMaintenanceRootResponse>(
        `/vehicles/maintenances/${id}`
      );

    return data;
  }

  public async createMaintenance(
    payload: ICreateVehicleMaintenancePayloadRoot
  ): Promise<ICreateVehicleMaintenanceResponseRoot> {
    const { data } =
      await this.axiosInstance.post<ICreateVehicleMaintenanceResponseRoot>(
        `/vehicles/maintenances`,
        payload
      );

    return data;
  }

  public async deleteMaintenance(id: string): Promise<IGeneralApiResponse> {
    const { data } = await this.axiosInstance.delete<IGeneralApiResponse>(
      `/vehicles/maintenances/${id}`
    );

    return data;
  }

  public async getFuelHistoryById(
    id: string
  ): Promise<IAllVehicleFuelResponseRoot> {
    const { data } = await this.axiosInstance.get<IAllVehicleFuelResponseRoot>(
      `/vehicles/fuels/${id}`
    );

    return data;
  }

  public async createFuelHistory(
    payload: ICreateVehicleFuelHistoryPayloadRoot
  ): Promise<ICreateVehicleFuelHistoryResponseRoot> {
    const { data } =
      await this.axiosInstance.post<ICreateVehicleFuelHistoryResponseRoot>(
        `/vehicles/fuels`,
        payload
      );

    return data;
  }

  public async deleteFuelHistory(id: string): Promise<IGeneralApiResponse> {
    const { data } = await this.axiosInstance.delete<IGeneralApiResponse>(
      `/vehicles/fuels/${id}`
    );

    return data;
  }
}

export const VehicleAPI = new VehicleService();
