import {
  Delete01Icon,
  Edit01Icon,
  MoreHorizontalIcon,
  Refresh01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
  onReindex: () => void;
  onDelete: () => void;
  isReindexing?: boolean;
}

export function SourceActionsMenu({
  onEdit,
  onReindex,
  onDelete,
  isReindexing,
}: SourceActionsMenuProps) {
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
        <DropdownMenuItem disabled={isReindexing} onSelect={onReindex}>
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
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
