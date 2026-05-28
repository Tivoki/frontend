import { z } from 'zod';
import type { KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';

export const addSourceBaseSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  url: z.string().optional(),
  content: z.string().optional(),
});

export type AddSourceFormData = z.infer<typeof addSourceBaseSchema>;

const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const getSchemaForType = (type: KnowledgeBaseSourceType) =>
  addSourceBaseSchema.superRefine((data, ctx) => {
    if (type === 'website') {
      if (!data.url) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'URL is required', path: ['url'] });
      } else if (!isValidUrl(data.url)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be a valid URL', path: ['url'] });
      }
    }

    if (type === 'faq' && data.url && !isValidUrl(data.url)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be a valid URL', path: ['url'] });
    }

    if (type === 'manual' && (!data.content || data.content.length < 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Content must be at least 10 characters',
        path: ['content'],
      });
    }
  });
