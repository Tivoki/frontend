'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import { Globe02Icon, File01Icon, Doc01Icon, Edit01Icon } from '@hugeicons/core-free-icons';

import { Button, DialogFooter } from '~/shared/ui/kit';
import { cn } from '~/shared/lib';
import type { KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';

interface SourceTypeOption {
  value: KnowledgeBaseSourceType;
  label: string;
  description: string;
  icon: IconSvgElement;
}

const SOURCE_TYPE_OPTIONS: SourceTypeOption[] = [
  {
    value: 'website',
    label: 'Website / Docs',
    description: 'Crawl any public URL or docs site',
    icon: Globe02Icon,
  },
  {
    value: 'file',
    label: 'File Upload',
    description: 'PDF, DOCX, TXT, CSV',
    icon: File01Icon,
  },
  {
    value: 'faq',
    label: 'FAQ / Q&A',
    description: 'Import structured question pairs',
    icon: Doc01Icon,
  },
  {
    value: 'manual',
    label: 'Manual Entry',
    description: 'Write content directly',
    icon: Edit01Icon,
  },
];

export { SOURCE_TYPE_OPTIONS };
export type { SourceTypeOption };

export interface TypeSelectorProps {
  selected: KnowledgeBaseSourceType | null;
  onSelect: (type: KnowledgeBaseSourceType) => void;
  onNext: () => void;
}

export function TypeSelector({ selected, onSelect, onNext }: TypeSelectorProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {SOURCE_TYPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all',
              selected === option.value
                ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                : 'border-border hover:border-primary/40 hover:bg-muted/40',
            )}
          >
            <div
              className={cn(
                'flex size-9 items-center justify-center rounded-xl transition-colors',
                selected === option.value ? 'bg-primary/10' : 'bg-muted',
              )}
            >
              <HugeiconsIcon
                icon={option.icon}
                strokeWidth={1.75}
                className={cn(
                  'size-5 transition-colors',
                  selected === option.value ? 'text-primary' : 'text-muted-foreground',
                )}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{option.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      <DialogFooter className="mt-4">
        <Button onClick={onNext} disabled={!selected}>
          Next
        </Button>
      </DialogFooter>
    </>
  );
}