'use client';

import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '~/shared/ui/kit';

interface KnowledgeBaseHeaderProps {
  onAddSource: () => void;
}

export const KnowledgeBaseHeader = ({ onAddSource }: KnowledgeBaseHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
          Knowledge Base
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage the sources your AI uses to answer customer questions.
        </p>
      </div>

      <Button size="sm" onClick={onAddSource} className="self-start sm:self-auto">
        <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
        Add Source
      </Button>
    </div>
  );
};
