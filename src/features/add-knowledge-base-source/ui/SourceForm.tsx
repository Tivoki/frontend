'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
import { sourceFormDataToCreatePayload, sourceFormDataToUpdateDto } from '../model/mappers';
import { getSchemaForType, type AddSourceFormData } from '../model/schema';
import { useCreateKnowledgeSource } from '../model/use-create-knowledge-source';
import { useUpdateKnowledgeSource } from '../model/use-update-knowledge-source';
import { FaqItemsField } from './FaqItemsField';
import { FileDropzone } from './FileDropzone';

const FORM_ID = 'add-source-form';

const PLACEHOLDERS: Record<KnowledgeBaseSourceType, string> = {
  website: 'Help Center',
  file: 'Shipping & Returns',
  faq: 'Product FAQs',
  manual: 'Getting Started Guide',
};

export interface SourceFormProps {
  workspaceId: string;
  type: KnowledgeBaseSourceType;
  defaultData?: Partial<AddSourceFormData>;
  mode: 'add' | 'edit';
  sourceId?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function SourceForm({
  workspaceId,
  type,
  defaultData,
  mode,
  sourceId,
  onBack,
  onSuccess,
}: SourceFormProps) {
  const schema = getSchemaForType(type, mode);
  const form = useForm<AddSourceFormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { name: '', url: '', content: '', items: [], file: null, ...defaultData },
  });

  const createSource = useCreateKnowledgeSource(workspaceId);
  const updateSource = useUpdateKnowledgeSource(workspaceId);

  const onSubmit = form.handleSubmit(async (data) => {
    if (mode === 'edit' && sourceId) {
      await updateSource.mutateAsync({
        sourceId,
        data: sourceFormDataToUpdateDto(type, data),
      });
    } else {
      await createSource.mutateAsync(sourceFormDataToCreatePayload(type, data));
    }
    onSuccess();
  });

  return (
    <FormProvider {...form}>
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
          <Controller
            name="file"
            control={form.control}
            render={({ field, fieldState }) => (
              <FileDropzone
                value={field.value}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
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
                  className="max-h-80 min-h-40 resize-y overflow-y-auto"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}

        {type === 'faq' && <FaqItemsField />}
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
    </FormProvider>
  );
}
