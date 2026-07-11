'use client';

import {
  AlertDiamondIcon,
  BookOpen01Icon,
  BrowserIcon,
  BubbleChatIcon,
  ChartAnalysisIcon,
  CogIcon,
  HomeIcon,
  PuzzleIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useScopedHref } from '~/features/switch-workspace';
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
      { id: 'copilot', label: 'Overview', sub: '', icon: HomeIcon, scope: 'workspace' },
      {
        id: 'conversations',
        label: 'Conversations',
        sub: 'conversations',
        icon: BubbleChatIcon,
        scope: 'workspace',
      },
    ],
  },
  {
    title: 'Build',
    items: [
      {
        id: 'knowledge-base',
        label: 'Knowledge Base',
        sub: 'knowledge-base',
        icon: BookOpen01Icon,
        scope: 'workspace',
      },
      {
        id: 'widget',
        label: 'Widget',
        sub: 'widget',
        icon: BrowserIcon,
        scope: 'workspace',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        sub: 'integrations',
        icon: PuzzleIcon,
        scope: 'workspace',
      },
    ],
  },
  {
    title: 'Monitor',
    items: [
      {
        id: 'escalation',
        label: 'Escalation',
        sub: 'escalation',
        icon: AlertDiamondIcon,
        scope: 'workspace',
      },
      {
        id: 'activity-logs',
        label: 'Activity logs',
        sub: 'logs',
        icon: ChartAnalysisIcon,
        scope: 'workspace',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        sub: 'settings',
        icon: CogIcon,
        scope: 'workspace',
      },
      {
        id: 'billing',
        label: 'Billing',
        sub: 'billing',
        icon: Wallet01Icon,
        scope: 'account',
      },
    ],
  },
] as const;

export const NavMenu = () => {
  const pathname = usePathname();
  const scopedHref = useScopedHref();
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
            <SidebarMenu className="md:space-y-px">
              {group.items.map((item) => {
                const href = scopedHref(item.scope, item.sub);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      tooltip={item.label}
                      size="default"
                    >
                      <Link href={href}>
                        <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};
