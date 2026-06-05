import { z } from 'zod';

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

export const LAUNCHER_STYLES = ['Chat bubble', 'Button', 'Text link'] as const;
export const WELCOME_MSG_MAX = 140;
export const AUTO_OPEN_DELAYS = ['0', '3', '5', '10', '30'] as const;
const MAX_Z_INDEX = 2147483647;

export const widgetConfigSchema = z.object({
  // Appearance
  primaryColor: z.string().regex(HEX_COLOR, 'Enter a valid hex color (e.g. #7C5AED)'),
  secondaryColor: z.string().regex(HEX_COLOR, 'Enter a valid hex color (e.g. #EDEDED)'),
  position: z.enum(['bottom-right', 'bottom-left']),
  launcherStyle: z.enum(LAUNCHER_STYLES),
  welcomeMessage: z
    .string()
    .min(1, 'Welcome message is required')
    .max(WELCOME_MSG_MAX, `Keep it under ${WELCOME_MSG_MAX} characters`),
  chatTitle: z.string().min(1, 'Chat title is required').max(50, 'Keep it under 50 characters'),

  // Branding
  brandingTitle: z.string().min(1, 'Title is required').max(50, 'Keep it under 50 characters'),
  brandingSubtitle: z.string().max(80, 'Keep it under 80 characters'),

  // Behavior
  autoOpen: z.boolean(),
  autoOpenDelay: z.enum(AUTO_OPEN_DELAYS),
  showLauncherOnMobile: z.boolean(),
  playSound: z.boolean(),
  requirePreChatForm: z.boolean(),

  // Security
  allowedDomains: z.string().max(2000, 'Keep it under 2000 characters'),
  identityVerification: z.boolean(),
  requireCookieConsent: z.boolean(),
  enableCaptcha: z.boolean(),

  // Advanced
  customCss: z.string().max(5000, 'Keep it under 5000 characters'),
  zIndex: z
    .number({ message: 'Enter a number' })
    .int('Must be a whole number')
    .min(0, 'Cannot be negative')
    .max(MAX_Z_INDEX, `Cannot exceed ${MAX_Z_INDEX}`),
  hideBranding: z.boolean(),
});

export type WidgetConfig = z.infer<typeof widgetConfigSchema>;

export const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  primaryColor: '#7C5AED',
  secondaryColor: '#EDEDED',
  position: 'bottom-right',
  launcherStyle: 'Chat bubble',
  welcomeMessage: 'Hi! How can we help you today? 😊',
  chatTitle: 'Acme Support',
  brandingTitle: 'Acme Support',
  brandingSubtitle: 'We usually reply in a few minutes',

  autoOpen: false,
  autoOpenDelay: '5',
  showLauncherOnMobile: true,
  playSound: true,
  requirePreChatForm: false,

  allowedDomains: '',
  identityVerification: false,
  requireCookieConsent: false,
  enableCaptcha: true,

  customCss: '',
  zIndex: 2147483000,
  hideBranding: false,
};
