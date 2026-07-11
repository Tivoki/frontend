'use client';

import { AUTO_OPEN_DELAYS } from '~/entities/widget';
import type { WidgetConfig } from '~/entities/widget';
import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/shared/ui/kit';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SwitchField } from './SwitchField';

const LABEL_CLASS = 'text-muted-foreground text-xs';

const delayLabel = (value: string) => (value === '0' ? 'Immediately' : `After ${value}s`);

export const BehaviorSection = () => {
  const { control } = useFormContext<WidgetConfig>();
  const autoOpen = useWatch({ control, name: 'autoOpen' });

  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-sm font-semibold">Behavior</h2>

      <div className="flex flex-col gap-5">
        <SwitchField
          name="autoOpen"
          label="Auto-open chat"
          description="Open the chat window automatically when a visitor lands on the page."
        />

        <Controller
          control={control}
          name="autoOpenDelay"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="behavior-delay" className={LABEL_CLASS}>
                Auto-open delay
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!autoOpen}
              >
                <SelectTrigger id="behavior-delay" className="w-full">
                  <span className="text-sm">{delayLabel(field.value)}</span>
                </SelectTrigger>
                <SelectContent position="popper">
                  {AUTO_OPEN_DELAYS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {delayLabel(value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <SwitchField
          name="showLauncherOnMobile"
          label="Show launcher on mobile"
          description="Display the chat launcher on small screens."
        />

        <SwitchField
          name="playSound"
          label="Sound on new message"
          description="Play a sound when a new message arrives."
        />

        <SwitchField
          name="requirePreChatForm"
          label="Pre-chat form"
          description="Ask visitors for their name and email before starting a chat."
        />
      </div>
    </section>
  );
};
