'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { DEFAULT_WIDGET_CONFIG, type WidgetConfig } from '~/entities/widget';
import { ChatWidgetPreview } from '~/widgets/chat-widget-preview';

export const WidgetPreviewPanel = () => {
  const { control } = useFormContext<WidgetConfig>();
  const watchedConfig = useWatch({ control });
  const config = { ...DEFAULT_WIDGET_CONFIG, ...watchedConfig } as WidgetConfig;

  return <ChatWidgetPreview config={config} />;
};
