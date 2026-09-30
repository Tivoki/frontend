'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { HTTPError } from 'ky';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  DEFAULT_WIDGET_CONFIG,
  useWidget,
  widgetConfigSchema,
  widgetDtoToConfig,
} from '~/entities/widget';
import type { WidgetConfig } from '~/entities/widget';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { useUpdateWidgetConfig } from '~/features/update-widget-config';
import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { WidgetPreviewPanel } from '~/widgets/widget';
import { WidgetCustomizer } from '~/widgets/widget-customizer';
import { WidgetPageSkeleton } from './WidgetPageSkeleton';
import { WidgetSetupPrompt } from './WidgetSetupPrompt';

export const WidgetPage = () => {
  const workspaceId = useActiveWorkspaceId();
  const { data: widget, isPending, isError, error } = useWidget(workspaceId);
  const updateWidgetConfig = useUpdateWidgetConfig(workspaceId ?? '');

  const formValues = useMemo(
    () => (widget ? widgetDtoToConfig(widget) : undefined),
    [widget],
  );

  const form = useForm<WidgetConfig>({
    resolver: standardSchemaResolver(widgetConfigSchema),
    defaultValues: DEFAULT_WIDGET_CONFIG,
    values: formValues,
    resetOptions: { keepDirtyValues: true },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: WidgetConfig) => {
    await updateWidgetConfig.mutateAsync(data);
  };

  if (!workspaceId || isPending) {
    return <WidgetPageSkeleton />;
  }

  if (isError) {
    if (error instanceof HTTPError && error.response.status === 404) {
      return <WidgetSetupPrompt workspaceId={workspaceId} />;
    }

    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">
          Couldn&apos;t load the widget configuration.
        </p>
      </div>
    );
  }

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
                onClick={() =>
                  formValues && reset(formValues, { keepDirtyValues: false })
                }
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
