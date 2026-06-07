import { Key02Icon, Link02Icon, Shield02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { Integration } from '~/entities/integration';
import { Badge } from '~/shared/ui/kit';

interface IntegrationConnectSettingsProps {
  integration: Integration;
}

const SCOPES = ['Read conversations', 'Create escalations', 'Sync transcripts'] as const;

export const IntegrationConnectSettings = ({
  integration,
}: IntegrationConnectSettingsProps) => {
  return (
    <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5">
      <div className="space-y-1">
        <h2 className="font-heading text-foreground text-base font-semibold">
          Connection details
        </h2>
        <p className="text-muted-foreground text-sm">
          Placeholder settings for {integration.name}. Replace these values with provider
          metadata when the API is ready.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="border-border rounded-xl border p-4">
          <div className="mb-3 flex items-center gap-2">
            <HugeiconsIcon
              icon={Link02Icon}
              strokeWidth={1.8}
              className="text-primary size-4"
            />
            <p className="text-foreground text-sm font-semibold">Redirect URL</p>
          </div>
          <div className="bg-muted text-muted-foreground overflow-x-auto rounded-lg px-3 py-2 font-mono text-xs">
            https://dashboard.tikketi.app/integrations/{integration.id}/callback
          </div>
        </div>

        <div className="border-border rounded-xl border p-4">
          <div className="mb-3 flex items-center gap-2">
            <HugeiconsIcon
              icon={Key02Icon}
              strokeWidth={1.8}
              className="text-primary size-4"
            />
            <p className="text-foreground text-sm font-semibold">Credential mode</p>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            OAuth 2.0 authorization code flow. Tokens should be exchanged and stored
            server-side.
          </p>
        </div>
      </div>

      <div className="border-border mt-4 rounded-xl border p-4">
        <div className="mb-3 flex items-center gap-2">
          <HugeiconsIcon
            icon={Shield02Icon}
            strokeWidth={1.8}
            className="text-primary size-4"
          />
          <p className="text-foreground text-sm font-semibold">Required scopes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCOPES.map((scope) => (
            <Badge key={scope} variant="outline">
              {scope}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
