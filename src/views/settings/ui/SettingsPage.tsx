'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { DEFAULT_SETTINGS, settingsSchema } from '~/entities/settings';
import type { SettingsValues } from '~/entities/settings';
import { SettingsSaveBar, SettingsTabs } from '~/widgets/settings';

export const SettingsPage = () => {
  const form = useForm<SettingsValues>({
    resolver: standardSchemaResolver(settingsSchema),
    defaultValues: DEFAULT_SETTINGS,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (data: SettingsValues) => {
    reset(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-1 flex-col">
        <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
          <div className="space-y-1">
            <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
              Settings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your workspace, team, billing, and security.
            </p>
          </div>

          <SettingsTabs />
        </div>

        <SettingsSaveBar />
      </form>
    </FormProvider>
  );
};
