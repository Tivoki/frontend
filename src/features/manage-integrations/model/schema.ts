import { z } from 'zod';

export const emailIntegrationSchema = z.object({
  email: z.email('Enter a valid email address'),
});
export type EmailIntegrationFormData = z.infer<typeof emailIntegrationSchema>;

export const webhookIntegrationSchema = z.object({
  url: z.url('Enter a valid URL'),
});
export type WebhookIntegrationFormData = z.infer<typeof webhookIntegrationSchema>;

export const topicRetentionSchema = z
  .object({
    mode: z.enum(['IMMEDIATE', 'HOURS', 'DAYS', 'NEVER']),
    value: z.number().int().min(1).optional(),
  })
  .refine(
    (data) =>
      data.mode === 'HOURS' || data.mode === 'DAYS' ? typeof data.value === 'number' : true,
    { message: 'Enter a number of 1 or more', path: ['value'] },
  );
export type TopicRetentionFormData = z.infer<typeof topicRetentionSchema>;
