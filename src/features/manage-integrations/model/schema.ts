import { z } from 'zod';

export const emailIntegrationSchema = z.object({
  email: z.email('Enter a valid email address'),
});
export type EmailIntegrationFormData = z.infer<typeof emailIntegrationSchema>;

export const webhookIntegrationSchema = z.object({
  url: z.url('Enter a valid URL'),
});
export type WebhookIntegrationFormData = z.infer<typeof webhookIntegrationSchema>;
