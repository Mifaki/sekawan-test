import { usePermissions } from '@/hooks/usePermission';
import { sidebarData } from '@/lib/static/SidebarData';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/shared/Components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '../Components/ApplicationLogo';
import { NavGroup } from './NavGroup';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { auth } = usePage().props;
  const { hasPermission } = usePermissions(auth.user?.permissions);

  const filteredSidebarData = sidebarData
    .map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          !item.requiredPermission || hasPermission(item.requiredPermission)
      ),
    }))
    .filter(group => group.items.length > 0);

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <Link href="/">
          <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
        </Link>
      </SidebarHeader>
      <SidebarRail />
      <SidebarContent>
        {filteredSidebarData.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
