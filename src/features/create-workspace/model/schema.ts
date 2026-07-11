import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Max 20 symbols'),
});

export type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;
