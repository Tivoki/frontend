import {
  EscalatedConversationsPanel,
  EscalationKpis,
  EscalationMethods,
} from '~/widgets/escalation';

export const EscalationPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="space-y-1">
        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
          Escalations
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Choose how visitors reach your team, and review conversations handed off to a
          human.
        </p>
      </div>

      <EscalationKpis className="hidden md:grid" />

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2">
        <EscalationMethods />
        <EscalatedConversationsPanel />
      </div>
    </div>
  );
};
