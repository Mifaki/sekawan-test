import {
  IUserUpdatePayloadRoot,
  IUserUpdateResponseRoot,
} from '../models/userinterfaces';
import { ApiClass } from './generalApi';

class UserServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async updateUser(
    id: string,
    payload: IUserUpdatePayloadRoot
  ): Promise<IUserUpdateResponseRoot> {
    const { data } = await this.axiosInstance.patch<IUserUpdateResponseRoot>(
      `/users/${id}`,
      payload
    );

    return data;
  }
}

export const UserAPI = new UserServices();
