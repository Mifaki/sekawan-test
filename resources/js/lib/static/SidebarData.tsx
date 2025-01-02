import { INavGroup } from '@/shared/models/layoutinterfaces';
import { PERMISSIONS } from '@/shared/models/permissioninterfaces';
import {
  CarFront,
  Grid2X2Plus,
  LayoutDashboardIcon,
  User2,
} from 'lucide-react';

export const sidebarData: INavGroup[] = [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'User',
        url: '/dashboard/user-management',
        icon: User2,
        requiredPermission: PERMISSIONS.VIEW_USERS,
      },
      {
        title: 'Vehicle',
        url: '/dashboard/vehicle-management',
        icon: CarFront,
      },
      {
        title: 'Booking',
        url: '/dashboard/booking-management',
        icon: Grid2X2Plus,
      },
    ],
  },
];
