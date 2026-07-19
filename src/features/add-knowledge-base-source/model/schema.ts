import { z } from 'zod';
import type { KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';

export const faqItemSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required').max(5000),
});

export type FaqItemFormData = z.infer<typeof faqItemSchema>;

export const addSourceBaseSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  url: z.string().optional(),
  content: z.string().optional(),
  items: z.array(faqItemSchema).optional(),
  file: z.instanceof(File).nullable().optional(),
});

export type AddSourceFormData = z.infer<typeof addSourceBaseSchema>;

const isValidUrl = (value: string) => z.url().safeParse(value).success;

export const getSchemaForType = (
  type: KnowledgeBaseSourceType,
  mode: 'add' | 'edit' = 'add',
) =>
  addSourceBaseSchema.superRefine((data, ctx) => {
    if (type === 'website') {
      if (!data.url) {
        ctx.addIssue({ code: 'custom', message: 'URL is required', path: ['url'] });
      } else if (!isValidUrl(data.url)) {
        ctx.addIssue({ code: 'custom', message: 'Must be a valid URL', path: ['url'] });
      }
    }

    if (type === 'faq' && data.url && !isValidUrl(data.url)) {
      ctx.addIssue({ code: 'custom', message: 'Must be a valid URL', path: ['url'] });
    }

    if (type === 'manual' && (!data.content || data.content.length < 10)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Content must be at least 10 characters',
        path: ['content'],
      });
    }

    if (type === 'faq' && (!data.items || data.items.length === 0)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Add at least one question and answer',
        path: ['items'],
      });
    }

    if (type === 'file' && mode === 'add' && !data.file) {
      ctx.addIssue({ code: 'custom', message: 'Choose a file to upload', path: ['file'] });
    }
  });
