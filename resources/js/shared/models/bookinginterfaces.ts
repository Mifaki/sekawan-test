import { IGeneralApiResponse } from './generalinterfaces';

export type TBookingStatus =
  | 'pending'
  | 'approved_l1'
  | 'rejected'
  | 'completed';
export type TBookingUpdateAction = 'APPROVED' | 'REJECTED';

export interface IRootBooking {
  id: string;
  vehicle_id: string;
  requested_by: string;
  driver_id: string;
  start_datetime: string;
  end_datetime: string;
  purpose: string;
  destination: string;
  passenger_count: number;
  status: TBookingStatus;
  requester_name: string;
  driver_name: string;
  vehicle_registration_number: string;
  relation: string[];
  first_reviewer: string;
  first_reviewer_name: string;
  first_approval_at?: string;
  second_reviewer: string;
  second_reviewer_name: string;
  second_approval_at?: string;
  rejected_by?: string;
  rejected_at?: string;
  rejection_reason?: string;
  rejecter_name?: string;
}

export interface IRootVehicleBooking {
  id: string;
  registration_number: string;
  vehicle_type: string;
}

export interface IRootUserBooking {
  id: string;
  name: string;
}

export interface ICreateBookingPayloadRoot {
  vehicle_id: string;
  driver_id: string;
  start_datetime: string;
  end_datetime: string;
  purpose: string;
  destination: string;
  passenger_count: number;
  first_reviewer: string;
  second_reviewer: string;
}

export interface ICreateBookingResponseRoot extends IGeneralApiResponse {
  booking: IRootBooking;
}

export interface IUpdateBookingPayloadRoot {
  action: TBookingUpdateAction;
  rejection_reason?: string;
}

export interface IUpdateBookingResponseRoot extends IGeneralApiResponse {
  booking: IRootBooking;
}
