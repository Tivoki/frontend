const INTEGRATION_ITEMS = [
  { id: 'email', label: 'Email' },
  { id: 'webchat', label: 'Webchat' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'intercom', label: 'Intercom' },
] as const;

export const IntegrationsPanel = () => {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Escalation / Integrations</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {INTEGRATION_ITEMS.map((integration) => (
          <div
            key={integration.id}
            className="flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {integration.label}
          </div>
        ))}
      </div>
    </div>
  );
};
