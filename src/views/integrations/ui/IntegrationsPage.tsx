import { INTEGRATIONS } from '~/entities/integration';
import { IntegrationsBrowser } from '~/widgets/integrations';

export const IntegrationsPage = () => {
  return (
    <div className="flex w-full max-w-400 flex-1 flex-col">
      <IntegrationsBrowser integrations={INTEGRATIONS} />
    </div>
  );
};
