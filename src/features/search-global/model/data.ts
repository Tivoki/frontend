import {
  Analytics01Icon,
  BookOpen01Icon,
  BubbleChatIcon,
  CogIcon,
  AlertDiamondIcon,
  PuzzleIcon,
  HomeIcon,
  BrowserIcon,
  Wallet01Icon,
  ChartAnalysisIcon,
  UserAdd01Icon,
  FileAddIcon,
  Doc01Icon,
  CodeCircleIcon,
  Settings01Icon,
  BarChartIcon,
} from '@hugeicons/core-free-icons';

import type { SearchGroup } from './types';

export const STATIC_SEARCH_GROUPS: SearchGroup[] = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'overview', label: 'Overview', description: 'Dashboard overview', icon: HomeIcon, href: '/', keywords: ['home', 'main', 'dashboard'] },
      { id: 'conversations', label: 'Page', description: 'Manage conversations', icon: BubbleChatIcon, href: '/conversations', keywords: ['chat', 'messages', 'talk'] },
      { id: 'knowledge-base', label: 'Knowledge Base', description: 'Articles and documents', icon: BookOpen01Icon, href: '/knowledge-base', keywords: ['kb', 'articles', 'faq', 'docs'] },
      { id: 'widget', label: 'Widget', description: 'Configure your chat widget', icon: BrowserIcon, href: '/widget', keywords: ['embed', 'chat widget', 'script'] },
      { id: 'integrations', label: 'Integrations', description: 'Connect third-party tools', icon: PuzzleIcon, href: '/integrations', keywords: ['connect', 'apps', 'plugins'] },
      { id: 'escalation', label: 'Escalation', description: 'Escalation rules and alerts', icon: AlertDiamondIcon, href: '/escalation', keywords: ['alerts', 'rules', 'handoff'] },
      { id: 'analytics', label: 'Analytics', description: 'Reports and insights', icon: Analytics01Icon, href: '/analytics', keywords: ['reports', 'stats', 'metrics'] },
      { id: 'activity-logs', label: 'Activity Logs', description: 'Audit log of all actions', icon: ChartAnalysisIcon, href: '/logs', keywords: ['audit', 'history', 'events'] },
      { id: 'settings', label: 'Settings', description: 'Account and workspace settings', icon: CogIcon, href: '/settings', keywords: ['config', 'preferences', 'account'] },
      { id: 'billing', label: 'Billing', description: 'Plans and invoices', icon: Wallet01Icon, href: '/billing', keywords: ['invoice', 'plan', 'subscription', 'payment'] },
    ],
  },
  {
    id: 'quick-actions',
    label: 'Quick Actions',
    items: [
      { id: 'new-conversation', label: 'New Conversation', description: 'Start a new conversation', icon: FileAddIcon, href: '/conversations/new', keywords: ['create', 'start', 'new chat'] },
      { id: 'invite-member', label: 'Invite Team Member', description: 'Add someone to your workspace', icon: UserAdd01Icon, href: '/settings/team/invite', keywords: ['team', 'member', 'invite', 'add user'] },
      { id: 'widget-settings', label: 'Configure Widget', description: 'Adjust widget appearance and behavior', icon: Settings01Icon, href: '/widget/settings', keywords: ['widget', 'config', 'appearance'] },
      { id: 'view-reports', label: 'View Reports', description: 'Open analytics dashboard', icon: BarChartIcon, href: '/analytics', keywords: ['reports', 'metrics', 'data'] },
    ],
  },
  {
    id: 'docs',
    label: 'Docs',
    items: [
      { id: 'doc-getting-started', label: 'Getting Started', description: 'Set up your workspace in minutes', icon: Doc01Icon, href: 'https://docs.tikketi.app/getting-started', keywords: ['setup', 'onboarding', 'start', 'guide'] },
      { id: 'doc-api', label: 'API Reference', description: 'Full REST API documentation', icon: CodeCircleIcon, href: 'https://docs.tikketi.app/api', keywords: ['api', 'rest', 'endpoints', 'swagger'] },
      { id: 'doc-widget', label: 'Widget Configuration', description: 'Customize and embed your widget', icon: BrowserIcon, href: 'https://docs.tikketi.app/widget', keywords: ['embed', 'snippet', 'javascript', 'widget'] },
      { id: 'doc-integrations', label: 'Integrations Guide', description: 'Connect your favorite tools', icon: PuzzleIcon, href: 'https://docs.tikketi.app/integrations', keywords: ['slack', 'zapier', 'webhook', 'connect'] },
    ],
  },
];
