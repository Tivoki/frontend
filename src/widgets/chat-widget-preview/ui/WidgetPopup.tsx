import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { WidgetConfig } from '~/entities/widget';


interface WidgetPopupProps {
  config: WidgetConfig;
}

export const WidgetPopup = ({ config }: WidgetPopupProps) => {
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

      <div className="flex flex-col gap-3 bg-background px-3 py-3">
        <div className="flex gap-2">
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            AI
          </div>
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed"
            style={{ backgroundColor: config.secondaryColor, color: '#111827' }}
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
            style={{ backgroundColor: config.secondaryColor, color: '#111827' }}
          >
            Sure! Please share your order number and I&#39;ll look into it right away.
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2">
          <span className="flex-1 text-xs text-muted-foreground">Type a message…</span>
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
              <path d="M1 6h10M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">Powered by Tikketi</p>
      </div>
    </div>
  );
};
