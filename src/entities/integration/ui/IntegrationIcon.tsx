import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '~/shared/lib';
import { INTEGRATION_CATALOG } from '../model/catalog';
import type { IntegrationType } from '../model/types';

interface IntegrationIconProps {
  type: IntegrationType;
  className?: string;
}

export const IntegrationIcon = ({ type, className }: IntegrationIconProps) => {
  const entry = INTEGRATION_CATALOG[type];

  return (
    <div
      className={cn(
        'bg-muted text-foreground flex size-11 shrink-0 items-center justify-center rounded-xl border',
        className,
      )}
      aria-hidden="true"
    >
      <HugeiconsIcon icon={entry.icon} strokeWidth={1.8} className="size-6" />
    </div>
  );
};
