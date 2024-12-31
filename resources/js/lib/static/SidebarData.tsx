import { INavGroup } from '@/shared/models/layoutinterfaces';
import { LayoutDashboardIcon, User2 } from 'lucide-react';

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
      },
    ],
  },
];
