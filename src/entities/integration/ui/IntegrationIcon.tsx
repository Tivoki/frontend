import { HugeiconsIcon } from '@hugeicons/react';
import type React from 'react';
import { DiscordIcon, GoogleSheetIcon, NotionIcon, SlackIcon } from '~/shared/icons';
import { cn } from '~/shared/lib';
import type { IntegrationBrand, IntegrationCustomIcon } from '../model/types';

const CUSTOM_ICONS: Record<
  IntegrationCustomIcon,
  React.ComponentType<React.ComponentProps<'svg'>>
> = {
  discord: DiscordIcon,
  'google-sheet': GoogleSheetIcon,
  notion: NotionIcon,
  slack: SlackIcon,
};

interface IntegrationIconProps {
  brand: IntegrationBrand;
  name: string;
  className?: string;
}

export const IntegrationIcon = ({ brand, name, className }: IntegrationIconProps) => {
  const CustomIcon = brand.customIcon ? CUSTOM_ICONS[brand.customIcon] : undefined;

  return (
    <div
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm',
        brand.background,
        brand.foreground,
        brand.border ?? 'border-border',
        className,
      )}
      aria-hidden="true"
    >
      {CustomIcon ? (
        <CustomIcon className="size-6" />
      ) : brand.icon ? (
        <HugeiconsIcon icon={brand.icon} strokeWidth={2.2} className="size-6" />
      ) : (
        <span className="font-heading text-lg leading-none font-bold">
          {brand.mark ?? name[0]}
        </span>
      )}
    </div>
  );
};
