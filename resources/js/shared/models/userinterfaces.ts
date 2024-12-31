import { IGeneralApiResponse } from './generalinterfaces';

export interface IRootuser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IUserUpdatePayloadRoot {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IUserUpdateResponseRoot extends IGeneralApiResponse {
  users: IRootuser;
}
