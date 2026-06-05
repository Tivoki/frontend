import { IntegrationsPanel } from '~/widgets/integrations-panel';
import { KnowledgeBaseStatus } from '~/widgets/knowledge-base';

export const DashboardInfoPanel = () => {
  return (
    <div className="flex shrink-0 flex-col gap-3">
      <KnowledgeBaseStatus />
      <IntegrationsPanel />
    </div>
  );
};
