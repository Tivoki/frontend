'use client';

import { MessageMultiple01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCreateWidget } from '~/features/create-widget';
import { Button } from '~/shared/ui/kit';

interface WidgetSetupPromptProps {
  workspaceId: string;
}

export const WidgetSetupPrompt = ({ workspaceId }: WidgetSetupPromptProps) => {
  const { mutate: createWidget, isPending } = useCreateWidget(workspaceId);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
        <HugeiconsIcon icon={MessageMultiple01Icon} strokeWidth={1.75} className="size-6" />
      </div>
      <div className="space-y-1">
        <h1 className="text-foreground text-lg font-semibold">Set up your widget</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          This workspace doesn&apos;t have a chat widget yet. Create one to customise its
          appearance and get an installation code.
        </p>
      </div>
      <Button onClick={() => createWidget()} disabled={isPending}>
        {isPending ? 'Creating…' : 'Create widget'}
      </Button>
    </div>
  );
};
