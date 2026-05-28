import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '~/shared/lib/utils';
import Link from 'next/link';

type LogoIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'> & {
  label?: string;
  decorative?: boolean;
  idPrefix?: string;
};

export function LogoIcon({
  className,
  label = 'Tikketi',
  decorative = false,
  idPrefix = 'tikketi-icon',
  ...props
}: LogoIconProps) {
  const gradientId = `${idPrefix}-gradient`;

  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
      className={cn('size-10 shrink-0', className)}
      {...props}
    >
      {!decorative && <title>{label}</title>}

      <defs>
        <linearGradient
          id={gradientId}
          x1="24"
          y1="22"
          x2="104"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <path
        d="M28 45C28 33.954 36.954 25 48 25H86C97.046 25 106 33.954 106 45V69C106 80.046 97.046 89 86 89H69L47 105V89C36.507 88.471 28 79.736 28 69V45Z"
        fill={`url(#${gradientId})`}
      />

      <rect x="43" y="47" width="48" height="27" rx="13.5" fill="white" fillOpacity="0.92" />

      <rect x="56" y="55" width="6" height="12" rx="3" fill="#111827" />
      <rect x="72" y="55" width="6" height="12" rx="3" fill="#111827" />
    </svg>
  );
}

type LogoProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  name?: string;
  showText?: boolean;
  iconClassName?: string;
  textClassName?: string;
};

export function Logo({
  className,
  iconClassName,
  textClassName,
  name = 'tikketi',
  showText = true,
  ...props
}: LogoProps) {
  return (
    <Link href='/' className={cn('inline-flex items-center gap-2.5 select-none', className)} {...props}>
      <LogoIcon decorative={showText} label={name} className={iconClassName} />

      {showText && (
        <span className={cn('text-xl font-semibold tracking-tight text-slate-950', textClassName)}>
          {name}
        </span>
      )}
    </Link>
  );
}
