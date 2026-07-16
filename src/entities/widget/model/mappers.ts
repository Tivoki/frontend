import type { components } from '~/shared/api';
import type { AutoOpenDelay, LauncherStyle, WidgetConfig } from './schema';

export type WidgetDto = components['schemas']['WidgetResponseDto'];
export type UpdateWidgetConfigDto = components['schemas']['UpdateWidgetConfigDto'];

const THEME_TO_FORM = { AUTO: 'auto', LIGHT: 'light', DARK: 'dark' } as const;
const THEME_TO_DTO = { auto: 'AUTO', light: 'LIGHT', dark: 'DARK' } as const;

const POSITION_TO_FORM = {
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;
const POSITION_TO_DTO = {
  'bottom-right': 'BOTTOM_RIGHT',
  'bottom-left': 'BOTTOM_LEFT',
} as const;

const LAUNCHER_STYLE_TO_FORM: Record<WidgetDto['launcherStyle'], LauncherStyle> = {
  CHAT_BUBBLE: 'Chat bubble',
  BUTTON: 'Button',
  TEXT_LINK: 'Text link',
};
const LAUNCHER_STYLE_TO_DTO: Record<LauncherStyle, WidgetDto['launcherStyle']> = {
  'Chat bubble': 'CHAT_BUBBLE',
  Button: 'BUTTON',
  'Text link': 'TEXT_LINK',
};

export const widgetDtoToConfig = (dto: WidgetDto): WidgetConfig => ({
  primaryColor: dto.primaryColor,
  secondaryColor: dto.secondaryColor,
  secondaryColorDark: dto.secondaryColorDark,
  theme: THEME_TO_FORM[dto.theme],
  position: POSITION_TO_FORM[dto.position],
  launcherStyle: LAUNCHER_STYLE_TO_FORM[dto.launcherStyle],
  welcomeMessage: dto.welcomeMessage,
  chatTitle: dto.chatTitle,
  brandingTitle: dto.brandName,
  brandingSubtitle: dto.brandingSubtitle,

  autoOpen: dto.autoOpen,
  autoOpenDelay: String(dto.autoOpenDelaySeconds) as AutoOpenDelay,
  showLauncherOnMobile: dto.showLauncherOnMobile,
  playSound: dto.playSound,
  requirePreChatForm: dto.requirePreChatForm,

  allowedDomains: dto.allowedDomains.join('\n'),
  identityVerification: dto.identityVerification,
  requireCookieConsent: dto.requireCookieConsent,
  enableCaptcha: dto.enableCaptcha,

  customCss: dto.customCss ?? '',
  zIndex: dto.zIndex,
  hideBranding: dto.hideBranding,
});

export const widgetConfigToUpdateDto = (config: WidgetConfig): UpdateWidgetConfigDto => ({
  primaryColor: config.primaryColor,
  secondaryColor: config.secondaryColor,
  secondaryColorDark: config.secondaryColorDark,
  theme: THEME_TO_DTO[config.theme],
  position: POSITION_TO_DTO[config.position],
  launcherStyle: LAUNCHER_STYLE_TO_DTO[config.launcherStyle],
  welcomeMessage: config.welcomeMessage,
  chatTitle: config.chatTitle,
  brandName: config.brandingTitle,
  brandingSubtitle: config.brandingSubtitle,

  autoOpen: config.autoOpen,
  autoOpenDelaySeconds: Number(
    config.autoOpenDelay,
  ) as UpdateWidgetConfigDto['autoOpenDelaySeconds'],
  showLauncherOnMobile: config.showLauncherOnMobile,
  playSound: config.playSound,
  requirePreChatForm: config.requirePreChatForm,

  allowedDomains: config.allowedDomains
    .split('\n')
    .map((domain) => domain.trim())
    .filter(Boolean),
  identityVerification: config.identityVerification,
  requireCookieConsent: config.requireCookieConsent,
  enableCaptcha: config.enableCaptcha,

  customCss: config.customCss,
  zIndex: config.zIndex,
  hideBranding: config.hideBranding,
});
