import type { Integration, IntegrationType } from '~/entities/integration';
import { IntegrationCard } from '~/entities/integration';

interface IntegrationsSectionProps {
  types: IntegrationType[];
  integrationsByType: Map<IntegrationType, Integration>;
  onConnect: (type: IntegrationType) => void;
  onConfigure: (type: IntegrationType, integration: Integration) => void;
  onTest: (integration: Integration) => void;
  onDisconnect: (integration: Integration) => void;
}

export const IntegrationsSection = ({
  types,
  integrationsByType,
  onConnect,
  onConfigure,
  onTest,
  onDisconnect,
}: IntegrationsSectionProps) => {
  return (
    <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((type) => (
          <IntegrationCard
            key={type}
            type={type}
            integration={integrationsByType.get(type)}
            onConnect={onConnect}
            onConfigure={onConfigure}
            onTest={onTest}
            onDisconnect={onDisconnect}
          />
        ))}
      </div>
    </section>
  );
};
