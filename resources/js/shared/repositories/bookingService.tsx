import {
  ICreateBookingPayloadRoot,
  ICreateBookingResponseRoot,
  IUpdateBookingPayloadRoot,
  IUpdateBookingResponseRoot,
} from '../models/bookinginterfaces';
import { ApiClass } from './generalApi';

class VehicleBookingService extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async createBooking(
    payload: ICreateBookingPayloadRoot
  ): Promise<ICreateBookingResponseRoot> {
    const { data } = await this.axiosInstance.post<ICreateBookingResponseRoot>(
      `/vehicles/bookings`,
      payload
    );

    return data;
  }

  public async updateBooking(
    id: string,
    payload: IUpdateBookingPayloadRoot
  ): Promise<IUpdateBookingResponseRoot> {
    const { data } = await this.axiosInstance.patch<IUpdateBookingResponseRoot>(
      `/vehicles/bookings/${id}`,
      payload
    );

    return data;
  }
}

export const VehicleBookingAPI = new VehicleBookingService();
