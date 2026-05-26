import { ChatWidgetPreview } from '~/widgets/chat-widget-preview';
import { IntegrationsPanel } from '~/widgets/integrations-panel';
import { KnowledgeBaseStatus } from '~/widgets/knowledge-base-status';

export const DashboardInfoPanel = () => {
  return (
    <div className="flex shrink-0 flex-col gap-3">
      <KnowledgeBaseStatus />
      <ChatWidgetPreview />
      <IntegrationsPanel />
    </div>
  );
};
