import type React from 'react';
import type { Integration } from '~/entities/integration';
import { IntegrationCard } from '~/entities/integration';
import { cn } from '~/shared/lib';

interface IntegrationsSectionProps {
  title: string;
  description: string;
  integrations: Integration[];
  onConnect?: (integration: Integration) => void;
  onEdit?: (integration: Integration) => void;
  onDelete?: (integration: Integration) => void;
}

export const IntegrationsSection = ({
  title,
  description,
  integrations,
  onConnect,
  onEdit,
  onDelete,
}: IntegrationsSectionProps) => {
  return (
    <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5">
      <div className="mb-5">
        <div className="space-y-1">
          <h2 className="font-heading text-foreground text-base font-semibold">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>

      <div
        className={cn(
          'grid gap-4',
          integrations.length > 0 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={onConnect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};
