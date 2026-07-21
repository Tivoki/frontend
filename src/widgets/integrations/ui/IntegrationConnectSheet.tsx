'use client';

import type { Integration, IntegrationType } from '~/entities/integration';
import { INTEGRATION_CATALOG } from '~/entities/integration';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/shared/ui/kit';
import { EmailConnectForm } from './EmailConnectForm';
import { TelegramConnectPanel } from './TelegramConnectPanel';
import { WebhookConnectForm } from './WebhookConnectForm';

interface IntegrationConnectSheetProps {
  workspaceId: string;
  type: IntegrationType | null;
  integration?: Integration;
  onClose: () => void;
}

export const IntegrationConnectSheet = ({
  workspaceId,
  type,
  integration,
  onClose,
}: IntegrationConnectSheetProps) => {
  return (
    <Sheet open={type !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full max-w-sm" aria-describedby={undefined}>
        <SheetHeader className="border-border border-b px-4 py-3">
          <SheetTitle className="text-sm">
            {type ? INTEGRATION_CATALOG[type].name : ''}
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          {type === 'EMAIL' && (
            <EmailConnectForm
              workspaceId={workspaceId}
              integration={integration}
              onDone={onClose}
            />
          )}
          {type === 'WEBHOOK' && (
            <WebhookConnectForm
              workspaceId={workspaceId}
              integration={integration}
              onDone={onClose}
            />
          )}
          {type === 'TELEGRAM' && integration && (
            <TelegramConnectPanel integration={integration} onDone={onClose} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
