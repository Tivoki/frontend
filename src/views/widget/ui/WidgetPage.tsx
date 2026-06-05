'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { DEFAULT_WIDGET_CONFIG, widgetConfigSchema } from '~/entities/widget';
import type { WidgetConfig } from '~/entities/widget';
import { WidgetCustomizer } from '~/widgets/widget-customizer';

import { WidgetPreviewPanel } from '~/widgets/widget/WidgetPreviewPanel';

export const WidgetPage = () => {
  const form = useForm<WidgetConfig>({
    resolver: standardSchemaResolver(widgetConfigSchema),
    defaultValues: DEFAULT_WIDGET_CONFIG,
    mode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: WidgetConfig) => {
    reset(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-400 flex-1 flex-col"
      >
        <div className="flex flex-col gap-4 p-4">
          <div>
            <div className="space-y-1">
              <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
                Widget
              </h1>
              <p className="text-muted-foreground text-sm">
                Customise your chat widget and get the installation code.
              </p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="border-border bg-card min-w-0 rounded-xl border p-5">
              <WidgetCustomizer />
            </div>

            <div className="min-w-0 xl:sticky xl:top-4 xl:self-start">
              <WidgetPreviewPanel />
            </div>
          </div>
        </div>

        <div
          className={cn(
            'border-border bg-background/90 sticky bottom-0 z-10 mt-auto border-t backdrop-blur-sm transition-opacity',
            isDirty || 'hidden',
          )}
        >
          <div className="flex items-center justify-between px-4 py-3">
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
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
