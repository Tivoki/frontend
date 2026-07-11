import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { WidgetConfig } from '~/entities/widget';

const WIDGET_THEME = {
  light: {
    chatBg: '#ffffff',
    inputBg: 'rgba(243,244,246,0.5)',
    inputBorder: '#e5e7eb',
    mutedText: '#9ca3af',
  },
  dark: {
    chatBg: '#16162a',
    inputBg: 'rgba(45,45,63,0.5)',
    inputBorder: '#374151',
    mutedText: '#6b7280',
  },
} as const;

interface WidgetPopupProps {
  config: WidgetConfig;
  previewTheme: 'light' | 'dark';
}

export const WidgetPopup = ({ config, previewTheme }: WidgetPopupProps) => {
  const t = WIDGET_THEME[previewTheme];
  const bubbleBg =
    previewTheme === 'light' ? config.secondaryColor : config.secondaryColorDark;
  const bubbleText = previewTheme === 'light' ? '#111827' : '#f9fafb';

  return (
    <div
      className="w-72 max-w-full overflow-hidden rounded-2xl"
      style={{ boxShadow: `0 8px 40px ${config.primaryColor}35` }}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
          AI
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{config.chatTitle}</p>
          <p className="truncate text-[11px] text-white/70">{config.brandingSubtitle}</p>
        </div>
        <button
          type="button"
          aria-label="Close chat"
          className="shrink-0 text-white/60 hover:text-white"
        >
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
        </button>
      </div>

      <div
        className="flex flex-col gap-3 px-3 py-3"
        style={{ backgroundColor: t.chatBg }}
      >
        <div className="flex gap-2">
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            AI
          </div>
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed"
            style={{ backgroundColor: bubbleBg, color: bubbleText }}
          >
            {config.welcomeMessage}
          </div>
        </div>

        <div className="flex justify-end">
          <div
            className="max-w-[75%] rounded-2xl rounded-tr-sm px-3 py-2 text-xs leading-relaxed text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            I have a question about my order
          </div>
        </div>

        <div className="flex gap-2">
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            AI
          </div>
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed"
            style={{ backgroundColor: bubbleBg, color: bubbleText }}
          >
            Sure! Please share your order number and I&#39;ll look into it right away.
          </div>
        </div>

        <div
          className="mt-1 flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{ backgroundColor: t.inputBg, borderColor: t.inputBorder }}
        >
          <span className="flex-1 text-xs" style={{ color: t.mutedText }}>
            Type a message…
          </span>
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            <svg
              className="size-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M1 6h10M7 2l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-[10px]" style={{ color: t.mutedText }}>
          Powered by Tikketi
        </p>
      </div>
    </div>
  );
};
