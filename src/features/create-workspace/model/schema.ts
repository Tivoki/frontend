import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  role: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role cannot exceed 50 characters'),
});

export type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;
