'use client';

import React, { type ComponentProps, type FC } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { BookOpenTextIcon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSidebar,
} from '~/shared/ui/kit';
import { cn } from '~/shared/lib';

type HelpCardProps = ComponentProps<'div'> & {};

export const HelpCard: FC<HelpCardProps> = ({ className, ...props }) => {
  const { isMobile, state } = useSidebar();
  const tooltip = 'View documentation';
  const button = (
    <Button
      aria-label={tooltip}
      className='mt-2 w-full group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0'
    >
      <span className="group-data-[collapsible=icon]:hidden">{tooltip}</span>
      <HugeiconsIcon className="group-data-[collapsible=icon]:hidden" icon={LinkSquare02Icon}/>
      <HugeiconsIcon className="hidden group-data-[collapsible=icon]:block" icon={BookOpenTextIcon}/>
    </Button>
  );

  return (
    <div
      className={cn(
        'rounded border p-3 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0',
        className,
      )}
      {...props}
    >
      <div className='text-sm group-data-[collapsible=icon]:hidden'>
        <div>
          <h4 className="font-medium">Need help ?</h4>
          <p>
            Check our docs or
            <a className='text-violet-600' href="mailto:test@gmail.com"> contact support</a>.
          </p>
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
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
