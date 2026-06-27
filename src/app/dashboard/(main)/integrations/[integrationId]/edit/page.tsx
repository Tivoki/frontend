import { notFound } from 'next/navigation';

import { getIntegrationById, INTEGRATIONS } from '~/entities/integration/index';
import { IntegrationEditPage } from '~/views/integration-edit/index';

export const generateStaticParams = () => {
  return INTEGRATIONS.filter((i) => i.status === 'connected').map((i) => ({
    integrationId: i.id,
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ integrationId: string }>;
}) {
  const { integrationId } = await params;
  const integration = getIntegrationById(integrationId);

  if (!integration) {
    notFound();
  }

  return <IntegrationEditPage integration={integration} />;
}
