import { SidebarInset, SidebarProvider } from '~/shared/ui/kit';
import { Header } from '~/widgets/header';
import { LeftSidebar } from '~/widgets/left-sidebar';
import { RightSidebar } from '~/widgets/right-sidebar';
import { StatsOverview } from '~/widgets/stats-overview';
import { ConversationChart } from '~/widgets/conversation-chart';
import { RecentConversations } from '~/widgets/recent-conversations';

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <LeftSidebar />

      <SidebarInset>
        <Header />

        <div className="flex flex-1 gap-4 overflow-hidden p-4">
          <main className="flex flex-1 flex-col gap-4 overflow-y-auto min-w-0">
            <StatsOverview />
            <ConversationChart />
            <RecentConversations />
          </main>

          <div className="overflow-y-auto">
            <RightSidebar />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
