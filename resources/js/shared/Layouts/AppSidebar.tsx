import { sidebarData } from '@/lib/static/SidebarData';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/shared/Components/ui/sidebar';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '../Components/ApplicationLogo';
import { NavGroup } from './NavGroup';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <Link href="/">
          <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
        </Link>
      </SidebarHeader>
      <SidebarRail />
      <SidebarContent>
        {sidebarData.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
