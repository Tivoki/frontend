'use client';

import type { SettingsValues } from '~/entities/settings';
import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { useFormContext } from 'react-hook-form';

export const SettingsSaveBar = () => {
  const {
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<SettingsValues>();

  return (
    <div
      className={cn(
        'border-border bg-background/90 sticky bottom-0 z-10 mt-auto border-t backdrop-blur-sm transition-opacity',
        isDirty || 'hidden',
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-muted-foreground text-sm">You have unsaved changes</p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
