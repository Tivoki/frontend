import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit01Icon,
  Delete01Icon,
  Refresh01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/kit';

interface SourceActionsMenuProps {
  onEdit: () => void;
}

export function SourceActionsMenu({ onEdit }: SourceActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Source actions"
        >
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            strokeWidth={1.75}
            className="size-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>
          <HugeiconsIcon
            icon={Refresh01Icon}
            strokeWidth={1.75}
            className="text-muted-foreground size-4"
          />
          Re-sync
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onEdit}>
          <HugeiconsIcon
            icon={Edit01Icon}
            strokeWidth={1.75}
            className="text-muted-foreground size-4"
          />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
