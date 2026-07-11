'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowLeft01Icon, CloudUploadIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Controller, useForm } from 'react-hook-form';
import type { KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';
import { cn } from '~/shared/lib';
import {
  Button,
  DialogFooter,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from '~/shared/ui/kit';
import { getSchemaForType, type AddSourceFormData } from '../model/schema';

const FORM_ID = 'add-source-form';

const PLACEHOLDERS: Record<KnowledgeBaseSourceType, string> = {
  website: 'Help Center',
  file: 'Shipping & Returns',
  faq: 'Product FAQs',
  manual: 'Getting Started Guide',
};

export interface SourceFormProps {
  type: KnowledgeBaseSourceType;
  defaultData?: Partial<AddSourceFormData>;
  mode: 'add' | 'edit';
  onBack: () => void;
  onSuccess: () => void;
}

export function SourceForm({
  type,
  defaultData,
  mode,
  onBack,
  onSuccess,
}: SourceFormProps) {
  const schema = getSchemaForType(type);
  const form = useForm<AddSourceFormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { name: '', url: '', content: '', ...defaultData },
  });

  const onSubmit = form.handleSubmit(() => {
    onSuccess();
  });

  return (
    <form id={FORM_ID} onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-name`}>Source name</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-name`}
                placeholder={PLACEHOLDERS[type]}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {(type === 'website' || type === 'faq') && (
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-url`}>
                  URL
                  {type === 'faq' && (
                    <span className="text-muted-foreground ml-1 font-normal">
                      (optional)
                    </span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${FORM_ID}-url`}
                  type="url"
                  placeholder="https://acme.com/help"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}

        {type === 'file' && (
          <div className="border-border hover:border-primary/40 hover:bg-muted/30 flex min-h-35 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors">
            <div className="bg-muted flex size-9 items-center justify-center rounded-xl">
              <HugeiconsIcon
                icon={CloudUploadIcon}
                strokeWidth={1.75}
                className="text-muted-foreground size-5"
              />
            </div>
            <div>
              <p className="text-foreground text-sm font-medium">
                Drag & drop or{' '}
                <span className="text-primary underline underline-offset-2">browse</span>
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                PDF, DOCX, TXT, CSV — up to 50 MB
              </p>
            </div>
          </div>
        )}

        {type === 'manual' && (
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-content`}>Content</FieldLabel>
                <Textarea
                  {...field}
                  id={`${FORM_ID}-content`}
                  placeholder="Write the knowledge base content here…"
                  className="min-h-40 resize-y"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}
      </FieldGroup>

      <DialogFooter className={cn('mt-4', mode === 'add' ? 'sm:justify-between' : '')}>
        {mode === 'add' && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-1.5"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              strokeWidth={1.75}
              className="size-3.5"
            />
            Back
          </Button>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {mode === 'add' ? 'Add Source' : 'Save Changes'}
        </Button>
      </DialogFooter>
    </form>
  );
}
