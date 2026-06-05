'use client';

import { ComputerIcon, SmartPhone01Icon, Tablet01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { cn } from '~/shared/lib';

import type { DeviceType } from '../model/types';

const DEVICES: { id: DeviceType; icon: typeof ComputerIcon; label: string }[] = [
  { id: 'desktop', icon: ComputerIcon, label: 'Desktop' },
  { id: 'tablet', icon: Tablet01Icon, label: 'Tablet' },
  { id: 'mobile', icon: SmartPhone01Icon, label: 'Mobile' },
];

interface DeviceSwitcherProps {
  value: DeviceType;
  onChange: (device: DeviceType) => void;
}

export const DeviceSwitcher = ({ value, onChange }: DeviceSwitcherProps) => {
  return (
    <div className="flex items-center rounded-lg border border-border bg-muted/60 p-0.5">
      {DEVICES.map(({ id, icon, label }) => (
        <button
          key={id}
          type="button"
          title={label}
          onClick={() => onChange(id)}
          className={cn(
            'rounded-md p-1.5 transition-colors',
            value === id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-3.5" />
        </button>
      ))}
    </div>
  );
};
