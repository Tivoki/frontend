import { ConversationChart } from '~/widgets/conversation';
import { RecentConversations } from '~/widgets/recent-conversations';
import { StatsOverview } from '~/widgets/stats-overview';
import { DashboardInfoPanel } from './DashboardInfoPanel';

export const DashboardPage = () => {
  return (
    <div className="grid max-w-400 flex-1 items-start gap-4 p-4 xl:grid-cols-[3fr_1fr]">
      <div className="grid gap-3">
        <StatsOverview />
        <ConversationChart />
        <RecentConversations />
      </div>
      <div className="sticky top-0 hidden self-start xl:block">
        <DashboardInfoPanel />
      </div>
    </div>
  );
};
