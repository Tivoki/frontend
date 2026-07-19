'use client';

import { Add01Icon, Delete01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from '~/shared/ui/kit';
import type { AddSourceFormData } from '../model/schema';

const FORM_ID = 'add-source-form';

export const FaqItemsField = () => {
  const { control, formState } = useFormContext<AddSourceFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const itemsError = formState.errors.items?.root?.message ?? formState.errors.items?.message;

  return (
    <Field>
      <FieldLabel>Questions & answers</FieldLabel>
      <FieldGroup className="gap-3">
        {fields.map((item, index) => (
          <div key={item.id} className="border-border space-y-2 rounded-lg border p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-2">
                <Controller
                  control={control}
                  name={`items.${index}.question`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id={`${FORM_ID}-item-${index}-question`}
                        placeholder="Question"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name={`items.${index}.answer`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Textarea
                        {...field}
                        id={`${FORM_ID}-item-${index}-answer`}
                        placeholder="Answer"
                        rows={2}
                        className="resize-none text-sm"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground shrink-0"
                aria-label="Remove question"
                onClick={() => remove(index)}
              >
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} className="size-4" />
              </Button>
            </div>
          </div>
        ))}

        {itemsError && <FieldError errors={[{ message: String(itemsError) }]} />}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 self-start"
          onClick={() => append({ question: '', answer: '' })}
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} className="size-3.5" />
          Add question
        </Button>
      </FieldGroup>
    </Field>
  );
};
