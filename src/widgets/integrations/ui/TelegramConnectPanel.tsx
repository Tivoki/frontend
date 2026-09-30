'use client';

import { Copy01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import { useTelegramBotInfo } from '~/entities/integration';
import type { Integration, TelegramIntegrationConfig } from '~/entities/integration';
import { Button, Skeleton } from '~/shared/ui/kit';
import { TelegramRetentionForm } from './TelegramRetentionForm';

interface TelegramConnectPanelProps {
  workspaceId: string;
  integration: Integration;
  onDone: () => void;
}

export const TelegramConnectPanel = ({
  workspaceId,
  integration,
  onDone,
}: TelegramConnectPanelProps) => {
  const config = integration.config as TelegramIntegrationConfig;
  const { data: botInfo } = useTelegramBotInfo();
  const botHandle = botInfo ? `@${botInfo.username}` : undefined;

  if (integration.status === 'CONNECTED') {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Connected to{' '}
          <strong className="text-foreground">{config.groupTitle || 'a Telegram group'}</strong>
          . It&apos;s already enabled for escalation — turn it off on the Escalation page if
          you don&apos;t want it used yet.
        </p>

        <TelegramRetentionForm workspaceId={workspaceId} integration={integration} onDone={onDone} />
      </div>
    );
  }

  const command = `/connect ${config.connectCode ?? ''}`;

  const copyCommand = () => {
    void navigator.clipboard.writeText(command);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-4">
      <ol className="text-muted-foreground list-decimal space-y-2 pl-4 text-sm">
        <li>
          Create a Telegram group (or use an existing one) and enable{' '}
          <strong className="text-foreground">Topics</strong> in its settings.
        </li>
        <li>
          Add{' '}
          {botHandle ? (
            <strong className="text-foreground">{botHandle}</strong>
          ) : (
            <Skeleton className="inline-block h-4 w-24 align-middle" />
          )}{' '}
          to the group as an admin, with permission to manage topics.
        </li>
        <li>Send this command in the group:</li>
      </ol>

      <div className="bg-muted flex items-center justify-between rounded-lg py-2 pr-2 pl-3">
        <code className="font-mono text-sm">{command}</code>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={copyCommand}
          aria-label="Copy command"
        >
          <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.8} className="size-4" />
        </Button>
      </div>

      <p className="text-muted-foreground text-xs">
        This will update automatically once the bot confirms the connection.
      </p>
    </div>
  );
};
