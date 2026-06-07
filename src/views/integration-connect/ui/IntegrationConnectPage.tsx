import type { Integration } from '~/entities/integration';
import {
  IntegrationConnectHero,
  IntegrationConnectSettings,
  IntegrationConnectSteps,
  IntegrationConnectSummary,
} from '~/widgets/integrations';

interface IntegrationConnectPageProps {
  integration: Integration;
}

export const IntegrationConnectPage = ({ integration }: IntegrationConnectPageProps) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4">
      <IntegrationConnectHero integration={integration} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid min-w-0 gap-4">
          <IntegrationConnectSettings integration={integration} />
          <IntegrationConnectSteps />
        </div>
        <IntegrationConnectSummary integration={integration} />
      </div>
    </div>
  );
};
