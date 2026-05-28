'use client';

import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Button } from '~/shared/ui/kit';

const AddSourceDialog = dynamic(
  () => import('~/features/add-knowledge-base-source').then((m) => m.AddSourceDialog),
  { ssr: false },
);

export const KnowledgeBaseHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold leading-tight text-foreground">
          Knowledge Base
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage the sources your AI uses to answer customer questions.
        </p>
      </div>

      <Button size="lg" onClick={() => setOpen(true)} className="self-start sm:self-auto">
        <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
        Add Source
      </Button>

      <AddSourceDialog open={open} onOpenChange={setOpen} mode="add" />
    </div>
  );
};
