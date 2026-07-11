import { notFound } from 'next/navigation';
import { getIntegrationById, INTEGRATIONS } from '~/entities/integration';
import { IntegrationConnectPage } from '~/views/integration-connect';

export const generateStaticParams = () => {
  return INTEGRATIONS.map((integration) => ({ integrationId: integration.id }));
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

  return <IntegrationConnectPage integration={integration} />;
}
