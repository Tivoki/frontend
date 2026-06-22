import { z } from 'zod';

export const INDUSTRIES = [
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Education',
  'Finance',
  'Other',
] as const;

export const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '50-200 employees',
  '200-1000 employees',
  '1000+ employees',
] as const;

export const TIMEZONES = [
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT+00:00) UTC',
  '(GMT+01:00) Central European Time',
  '(GMT+02:00) Eastern European Time',
] as const;

export const LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish',
  'German',
  'French',
  'Ukrainian',
] as const;

export const WIDGET_LANGUAGES = [
  'English',
  'Spanish',
  'German',
  'French',
  'Ukrainian',
] as const;

export const AI_TONES = ['Friendly', 'Professional', 'Casual', 'Formal'] as const;

export const FALLBACK_OPTIONS = [
  'Show custom message',
  'Escalate to human',
  'Collect email',
  'Do nothing',
] as const;

export const SESSION_TIMEOUTS = [
  '15 minutes',
  '30 minutes',
  '1 hour',
  '4 hours',
  'Never',
] as const;

export const COMPANY_NAME_MAX = 60;
export const FALLBACK_MSG_MAX = 200;

export const settingsSchema = z.object({
  // General — Company information
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(COMPANY_NAME_MAX, `Keep it under ${COMPANY_NAME_MAX} characters`),
  companyEmail: z.string().email('Enter a valid email'),
  industry: z.enum(INDUSTRIES),
  companySize: z.enum(COMPANY_SIZES),
  website: z.union([z.string().url('Enter a valid URL'), z.literal('')]),

  // General — Regional settings
  timezone: z.enum(TIMEZONES),
  language: z.enum(LANGUAGES),

  // General — Default behavior
  widgetLanguage: z.enum(WIDGET_LANGUAGES),
  aiTone: z.enum(AI_TONES),
  fallback: z.enum(FALLBACK_OPTIONS),
  customFallbackMessage: z
    .string()
    .max(FALLBACK_MSG_MAX, `Keep it under ${FALLBACK_MSG_MAX} characters`),

  // General — Contact email
  contactEmail: z.string().email('Enter a valid email'),

  // Security
  twoFactorEnabled: z.boolean(),
  loginAlerts: z.boolean(),
  sessionTimeout: z.enum(SESSION_TIMEOUTS),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS: SettingsValues = {
  companyName: 'Acme Corporation',
  companyEmail: 'support@acme.com',
  industry: 'E-commerce',
  companySize: '50-200 employees',
  website: 'https://acme.com',

  timezone: '(GMT-05:00) Eastern Time (US & Canada)',
  language: 'English (US)',

  widgetLanguage: 'English',
  aiTone: 'Friendly',
  fallback: 'Show custom message',
  customFallbackMessage: "Sorry, I couldn't find an answer to your question.",

  contactEmail: 'olivia@acme.com',

  twoFactorEnabled: true,
  loginAlerts: true,
  sessionTimeout: '30 minutes',
};
