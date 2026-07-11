'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '~/shared/ui/kit';
import { HelpCard, Logo } from '~/shared/ui/primitives';
import { NavMenu } from './ui/NavMenu';

export const LeftSidebar = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-sidebar-border items-start justify-center border-b px-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <Logo
          aria-label="Tikketi"
          className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
          iconClassName="group-data-[collapsible=icon]:size-8"
          textClassName="group-data-[collapsible=icon]:hidden"
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMenu />
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border items-center border-t p-3 group-data-[collapsible=icon]:p-2">
        <HelpCard />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
