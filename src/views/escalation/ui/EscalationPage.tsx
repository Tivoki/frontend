import {
  EscalatedConversationsPanel,
  EscalationKpis,
  HandoffChannels,
  RoutingRules,
} from '~/widgets/escalation';

export const EscalationPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="space-y-1">
        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
          Escalations
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage human handoff channels, routing rules, and escalated conversations.
        </p>
      </div>

      <EscalationKpis className="hidden md:grid" />

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
          <HandoffChannels />
          <RoutingRules />
        </div>
        <EscalatedConversationsPanel />
      </div>
    </div>
  );
};
