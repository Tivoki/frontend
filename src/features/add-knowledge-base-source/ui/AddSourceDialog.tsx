'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/shared/ui/kit';
import type { KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';
import type { AddSourceFormData } from '../model/schema';
import { TypeSelector, SOURCE_TYPE_OPTIONS } from './TypeSelector';
import { SourceForm } from './SourceForm';

export interface AddSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'add' | 'edit';
  defaultType?: KnowledgeBaseSourceType;
  defaultData?: Partial<AddSourceFormData>;
}

export function AddSourceDialog({
  open,
  onOpenChange,
  mode = 'add',
  defaultType,
  defaultData,
}: AddSourceDialogProps) {
  const [step, setStep] = useState<1 | 2>(defaultType ? 2 : 1);
  const [selectedType, setSelectedType] = useState<KnowledgeBaseSourceType | null>(
    defaultType ?? null,
  );

  const typeOption = selectedType
    ? SOURCE_TYPE_OPTIONS.find((o) => o.value === selectedType)
    : null;

  const handleOpenChange = (next: boolean) => {
    if (!next && mode === 'add') {
      setStep(1);
      setSelectedType(null);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-[min(32rem,calc(100%-2rem))] gap-0 overflow-hidden p-0"
        aria-describedby={undefined}
      >
        <DialogHeader className="border-b px-4 pb-4 pt-4">
          <DialogTitle>
            {mode === 'edit'
              ? `Edit ${typeOption?.label ?? 'Source'}`
              : step === 1
                ? 'Add New Source'
                : `Configure ${typeOption?.label ?? 'Source'}`}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update the configuration for this source'
              : step === 1
                ? 'Step 1 of 2 — choose where your knowledge comes from'
                : 'Step 2 of 2 — fill in the source details'}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4">
          {step === 1 && (
            <TypeSelector
              selected={selectedType}
              onSelect={setSelectedType}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && selectedType && (
            <SourceForm
              key={selectedType}
              type={selectedType}
              defaultData={defaultData}
              mode={mode}
              onBack={() => setStep(1)}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}