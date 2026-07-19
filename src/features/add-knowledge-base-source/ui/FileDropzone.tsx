'use client';

import { CloudUploadIcon, Delete01Icon, File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useId, useState } from 'react';
import { cn } from '~/shared/lib';
import { Button, FieldError } from '~/shared/ui/kit';

const ACCEPTED_TYPES = '.pdf,.docx,.txt,.csv';

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface FileDropzoneProps {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  invalid?: boolean;
  errorMessage?: string;
}

export const FileDropzone = ({
  value,
  onChange,
  invalid,
  errorMessage,
}: FileDropzoneProps) => {
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <>
      {value ? (
        <div
          className={cn(
            'border-border bg-muted/30 flex items-center gap-3 rounded-xl border p-3',
            invalid && 'border-destructive',
          )}
        >
          <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-xl">
            <HugeiconsIcon
              icon={File01Icon}
              strokeWidth={1.75}
              className="text-muted-foreground size-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-medium">{value.name}</p>
            <p className="text-muted-foreground text-xs">{formatFileSize(value.size)}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground shrink-0"
            aria-label="Remove file"
            onClick={() => onChange(null)}
          >
            <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} className="size-4" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            onChange(e.dataTransfer.files[0] ?? null);
          }}
          className={cn(
            'flex min-h-35 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors',
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/40 hover:bg-muted/30',
            invalid && 'border-destructive',
          )}
        >
          <div className="bg-muted flex size-9 items-center justify-center rounded-xl">
            <HugeiconsIcon
              icon={CloudUploadIcon}
              strokeWidth={1.75}
              className="text-muted-foreground size-5"
            />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">
              Drag & drop or{' '}
              <span className="text-primary underline underline-offset-2">browse</span>
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              PDF, DOCX, TXT, CSV — up to 50 MB
            </p>
          </div>
          <input
            id={inputId}
            type="file"
            accept={ACCEPTED_TYPES}
            className="sr-only"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
      {invalid && errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </>
  );
};
