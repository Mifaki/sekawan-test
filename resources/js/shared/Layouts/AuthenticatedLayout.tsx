import { Button } from '@/shared/Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/Components/ui/dropdown-menu';
import { ScrollArea } from '@/shared/Components/ui/scroll-area';
import { Separator } from '@/shared/Components/ui/separator';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/Components/ui/sidebar';
import { Toaster } from '@/shared/Components/ui/toaster';
import { Link, usePage } from '@inertiajs/react';
import { CircleUser } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';

export default function Authenticated({
  children,
  header,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const { auth } = usePage().props;
  const user = auth.user;

  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <div className="h-full w-full">
        <header className="flex h-14 items-center gap-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex w-full flex-1 items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={route('profile.edit')}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="w-full"
                    >
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <ScrollArea>
          <main className="px-6 pt-6">
            {header && <div className="pb-4">{header}</div>}
            <div className="mb-6">{children}</div>
          </main>
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
}
