import { cn } from '~/shared/lib';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { LogoIcon } from './LogoIcon';

type LogoProps = Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'href'> & {
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
      href="/dashboard"
      className={cn('inline-flex items-center gap-2.5 select-none', className)}
      {...props}
    >
      <LogoIcon decorative={showText} label={name} className={iconClassName} />

      {showText && (
        <span
          className={cn(
            'text-foreground text-xl font-semibold tracking-tight',
            textClassName,
          )}
        >
          {name}
        </span>
      )}
    </Link>
  );
}
