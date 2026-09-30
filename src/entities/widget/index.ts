export type { WidgetConfig, LauncherStyle, AutoOpenDelay } from './model/schema';
export {
  DEFAULT_WIDGET_CONFIG,
  widgetConfigSchema,
  LAUNCHER_STYLES,
  WELCOME_MSG_MAX,
  AUTO_OPEN_DELAYS,
} from './model/schema';
export type { WidgetDto } from './model/mappers';
export { widgetDtoToConfig, widgetConfigToUpdateDto } from './model/mappers';
export { widgetKeys } from './model/keys';
export { useWidget } from './api/use-widget';
