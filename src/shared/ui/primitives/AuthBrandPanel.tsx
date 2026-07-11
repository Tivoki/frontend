import { HugeiconsIcon } from '@hugeicons/react';
import {
  Analytics01Icon,
  FlashIcon,
  TrendingUpDownIcon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

import { Logo } from './Logo';
import { WidgetPreviewIllustration } from './WidgetPreviewIllustration';

const BENEFITS: { icon: IconSvgElement; title: string; description: string }[] = [
  {
    icon: FlashIcon,
    title: 'AI that resolves tickets 24/7',
    description: 'Answer common questions instantly and save your team time.',
  },
  {
    icon: TrendingUpDownIcon,
    title: 'Smart escalation',
    description: 'Route conversations to the right agent at the right time.',
  },
  {
    icon: Analytics01Icon,
    title: 'Analytics & reporting',
    description: 'Track performance and uncover insights that help you improve.',
  },
];

export function AuthBrandPanel() {
  return (
    <div
      className="relative hidden overflow-hidden lg:flex lg:w-[45%] lg:flex-col xl:w-[40%]"
      style={{
        background:
          'linear-gradient(145deg, oklch(0.28 0.22 265) 0%, oklch(0.42 0.24 262) 55%, oklch(0.52 0.22 258) 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden
      />
      <div
        className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-blue-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-16 size-72 rounded-full bg-indigo-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute right-12 bottom-1/3 size-40 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />

      {/* Logo: pinned top-left */}
      <div className="relative z-10 px-10 pt-8">
        <Logo textClassName="text-white" />
      </div>

      {/* Content: sits near the top, right below the logo */}
      <div className="relative z-10 flex-1 px-10 pt-10 pb-8">
        <h2 className="text-3xl leading-tight font-bold text-white">
          Customer support, <br />
          powered by <span className="text-sky-300">AI</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Deploy an intelligent support widget in minutes. Resolve tickets faster,
          escalate smarter, and keep every conversation in one place.
        </p>

        <ul className="mt-6 space-y-4">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <HugeiconsIcon
                  icon={benefit.icon}
                  strokeWidth={1.75}
                  className="size-4.5 text-white"
                />
              </div>
              <div>
                <p className="text-sm leading-snug font-semibold text-white">
                  {benefit.title}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-white/60">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Illustration: fixed-height zone flush with panel bottom; SVG overflows → clipped */}
      <div className="relative z-10 flex h-72 shrink-0 justify-center xl:h-80">
        <WidgetPreviewIllustration className="w-72 xl:w-80" />
      </div>
    </div>
  );
}
