import { Config } from 'ziggy-js';
import { Permission } from './permissioninterfaces';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  email_verified_at?: string;
  permissions: Permission[];
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
