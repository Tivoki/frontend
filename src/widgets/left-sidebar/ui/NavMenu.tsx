'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  BookOpen01Icon,
  BubbleChatIcon,
  CogIcon,
  AlertDiamondIcon,
  PuzzleIcon,
  HomeIcon,
  BrowserIcon,
  Wallet01Icon,
  ChartAnalysisIcon,
} from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/shared/ui/kit';

const NAV_GROUPS = [
  {
    title: 'Workspace',
    items: [
      { id: 'copilot', label: 'Overview', href: '/dashboard', icon: HomeIcon },
      { id: 'conversations', label: 'Conversations', href: '/dashboard/conversations', icon: BubbleChatIcon },
    ],
  },
  {
    title: 'Build',
    items: [
      { id: 'knowledge-base', label: 'Knowledge Base', href: '/dashboard/knowledge-base', icon: BookOpen01Icon },
      { id: 'widget', label: 'Widget', href: '/dashboard/widget', icon: BrowserIcon },
      { id: 'integrations', label: 'Integrations', href: '/dashboard/integrations', icon: PuzzleIcon },
    ],
  },
  {
    title: 'Monitor',
    items: [
      { id: 'escalation', label: 'Escalation', href: '/dashboard/escalation', icon: AlertDiamondIcon },
      { id: 'activity-logs', label: 'Activity logs', href: '/dashboard/logs', icon: ChartAnalysisIcon },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: CogIcon },
      { id: 'billing', label: 'Billing', href: '/dashboard/billing', icon: Wallet01Icon },
    ],
  },
] as const;

export const NavMenu = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const mountedPathname = useRef(pathname);
  useEffect(() => {
    if (pathname !== mountedPathname.current && isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <>
      {NAV_GROUPS.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='md:space-y-px'>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    size="default"
                  >
                    <Link href={item.href}>
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};
