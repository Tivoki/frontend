import type { Integration } from '~/entities/integration';

interface IntegrationEditPageProps {
  integration: Integration;
}

export const IntegrationEditPage = ({ integration }: IntegrationEditPageProps) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4">
      <p>{integration.name}</p>
    </div>
  );
};
