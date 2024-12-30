import { INavGroup } from '@/shared/models/layoutinterfaces';
import { LayoutDashboardIcon } from 'lucide-react';

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
        title: 'Tasks',
        url: '/tasks',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Apps',
        url: '/apps',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Chats',
        url: '/chats',
        badge: '3',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Users',
        url: '/users',
        icon: LayoutDashboardIcon,
      },
    ],
  },
];
