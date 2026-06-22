import type { SettingsValues } from '~/entities/settings';

/** Keys of the settings form whose value is a string (selects, inputs). */
export type SettingsStringField = {
  [K in keyof SettingsValues]: SettingsValues[K] extends string ? K : never;
}[keyof SettingsValues];

/** Keys of the settings form whose value is a boolean (switches). */
export type SettingsBooleanField = {
  [K in keyof SettingsValues]: SettingsValues[K] extends boolean ? K : never;
}[keyof SettingsValues];
