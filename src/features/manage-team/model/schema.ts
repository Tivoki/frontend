import { z } from 'zod';

export const inviteMemberSchema = z.object({
  email: z.string().email('Enter a valid email'),
  role: z.enum(['ADMIN', 'AGENT', 'VIEWER']),
});

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
