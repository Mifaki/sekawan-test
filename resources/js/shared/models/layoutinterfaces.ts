import { Permission } from './permissioninterfaces';

export interface IBaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
  requiredPermission?: Permission;
}

export type TNavLink = IBaseNavItem & {
  url: string;
  items?: never;
};

export type TNavCollapsible = IBaseNavItem & {
  items: (IBaseNavItem & {
    url: string;
  })[];
  url?: never;
};

export type TNavItem = TNavCollapsible | TNavLink;

export interface INavGroup {
  title: string;
  items: TNavItem[];
}
