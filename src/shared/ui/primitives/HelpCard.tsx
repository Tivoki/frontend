'use client';

import { BookOpenTextIcon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '~/shared/lib';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSidebar,
} from '~/shared/ui/kit';
import React, { type ComponentProps, type FC } from 'react';

type HelpCardProps = ComponentProps<'div'> & {};

export const HelpCard: FC<HelpCardProps> = ({ className, ...props }) => {
  const { isMobile, state } = useSidebar();
  const tooltip = 'View documentation';

  return (
    <div
      className={cn(
        'rounded border p-3 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0',
        className,
      )}
      {...props}
    >
      <div className="text-sm group-data-[collapsible=icon]:hidden">
        <div>
          <h4 className="font-medium">Need help ?</h4>
          <p>
            Check our docs or{' '}
            <a className="text-primary underline" href="mailto:test@gmail.com">
              contact support
            </a>
          </p>
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={tooltip}
            className="mt-2 w-full group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
          >
            <span className="group-data-[collapsible=icon]:hidden">{tooltip}</span>
            <HugeiconsIcon
              className="group-data-[collapsible=icon]:hidden"
              icon={LinkSquare02Icon}
            />
            <HugeiconsIcon
              className="hidden group-data-[collapsible=icon]:block"
              icon={BookOpenTextIcon}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
