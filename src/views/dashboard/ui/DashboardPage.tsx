import { StatsOverview } from '~/widgets/stats-overview';
import { ConversationChart } from '~/widgets/conversation-chart';
import { RecentConversations } from '~/widgets/recent-conversations';
import { DashboardInfoPanel } from './DashboardInfoPanel';

export const DashboardPage = () => {
  return (
    <div className="grid flex-1 items-start gap-4 xl:grid-cols-[3fr_1fr]">
      <div className="grid gap-3">
        <StatsOverview />
        <ConversationChart />
        <RecentConversations />
      </div>
      <div className="hidden xl:block sticky top-0 self-start">
        <DashboardInfoPanel />
      </div>
    </div>
  );
};
