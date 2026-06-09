import type { ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';

import { cn } from '~/shared/lib';

import { LogoIcon } from './LogoIcon';

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
    <Link
      href="/"
      className={cn('inline-flex select-none items-center gap-2.5', className)}
      {...props}
    >
      <LogoIcon decorative={showText} label={name} className={iconClassName} />

      {showText && (
        <span className={cn('text-xl font-semibold tracking-tight text-foreground', textClassName)}>
          {name}
        </span>
      )}
    </Link>
  );
}
