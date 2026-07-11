import type { SettingsValues } from '~/entities/settings';

export type SettingsStringField = {
  [K in keyof SettingsValues]: SettingsValues[K] extends string ? K : never;
}[keyof SettingsValues];
