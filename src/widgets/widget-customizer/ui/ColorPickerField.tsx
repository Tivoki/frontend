'use client';

import * as React from 'react';
import { cn } from '~/shared/lib';

interface ColorPickerFieldProps {
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the native color swatch input. */
  label: string;
  id?: string;
  'aria-invalid'?: boolean;
  className?: string;
}

export const ColorPickerField = ({
  value,
  onChange,
  label,
  id,
  className,
  ...props
}: ColorPickerFieldProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange(raw.startsWith('#') ? raw : `#${raw}`);
  };

  return (
    <div
      aria-invalid={props['aria-invalid']}
      className={cn(
        'border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-8 items-center gap-2 rounded-lg border bg-transparent px-2.5 focus-within:ring-3 aria-invalid:ring-3',
        className,
      )}
    >
      <label className="flex shrink-0 cursor-pointer items-center">
        <input
          type="color"
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute size-4 cursor-pointer rounded-sm border-0 bg-transparent p-0 opacity-0"
        />
        <span
          className="border-border size-4 shrink-0 rounded-sm border"
          style={{ backgroundColor: value }}
        />
      </label>
      <input
        id={id}
        type="text"
        value={value.toUpperCase()}
        onChange={handleTextChange}
        maxLength={7}
        className="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm uppercase outline-none"
      />
    </div>
  );
};
