import { Badge } from '@/shared/Components/ui/badge';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/Components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { INavGroup, TNavItem, TNavLink } from '../models/layoutinterfaces';

function checkIsActive(href: string, item: TNavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item?.items?.filter(i => i.url === href).length ||
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item?.url?.split('/')[1])
  );
}

export function NavGroup({ title, items }: INavGroup) {
  const { url } = usePage();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={url} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const SidebarMenuLink = ({ item, href }: { item: TNavLink; href: string }) => {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <Link href={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <Badge>{item.badge}</Badge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
