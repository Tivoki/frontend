'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Delete01Icon,
  MoreHorizontalIcon,
  PencilEdit01Icon,
} from '@hugeicons/core-free-icons';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/kit';

interface RoutingRuleActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const RoutingRuleActions = ({ onEdit, onDelete }: RoutingRuleActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.75} className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        <DropdownMenuItem onClick={onEdit}>
          <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={1.75} className="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
