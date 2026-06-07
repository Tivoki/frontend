const INTEGRATION_ITEMS = [
  { id: 'email', label: 'Email' },
  { id: 'webchat', label: 'Webchat' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'intercom', label: 'Intercom' },
] as const;

export const IntegrationsPanel = () => {
  return (
    <div className="border-border bg-background rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-foreground text-sm font-semibold">
          Escalation / Integrations
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {INTEGRATION_ITEMS.map((integration) => (
          <div
            key={integration.id}
            className="border-border text-muted-foreground hover:bg-muted hover:text-foreground flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
          >
            {integration.label}
          </div>
        ))}
      </div>
    </div>
  );
};
