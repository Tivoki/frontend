'use client';

import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ConversationDetail } from '~/entities/conversation';
import { useMe } from '~/entities/user';
import { useWorkspaceMembers } from '~/entities/workspace';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/kit';
import { useConversationAction } from '../model/use-conversation-action';

interface AssignMenuProps {
  conversation: ConversationDetail;
}

const ASSIGNABLE_ROLES = new Set(['OWNER', 'ADMIN', 'AGENT']);

/** Reassign (ADMIN+) or release your own assignment. */
export const AssignMenu = ({ conversation }: AssignMenuProps) => {
  const { capabilities, activeEscalation } = conversation;
  const action = useConversationAction(conversation.workspaceId, conversation.id);
  const members = useWorkspaceMembers(
    capabilities.canAssign ? conversation.workspaceId : null,
  );
  const { data: me } = useMe();
  if (!activeEscalation || (!capabilities.canAssign && !capabilities.canUnassign)) {
    return null;
  }
  const assigneeId = activeEscalation.assignedTo?.id ?? null;
  const candidates = (members.data?.pages ?? [])
    .flatMap((page) => page.data)
    .filter(
      (member) => ASSIGNABLE_ROLES.has(member.role) && member.userId !== assigneeId,
    );
  const run = (type: 'ASSIGN' | 'UNASSIGN', assigneeUserId?: string) =>
    action.mutate({
      action:
        type === 'ASSIGN'
          ? { type, escalationId: activeEscalation.id, assigneeUserId: assigneeUserId! }
          : { type, escalationId: activeEscalation.id },
      expectedRevision: conversation.revision,
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" disabled={action.isPending} className="gap-1">
          Assign
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={1.75} className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-72 w-56 overflow-y-auto">
        {capabilities.canUnassign && assigneeId && (
          <>
            <DropdownMenuItem onSelect={() => run('UNASSIGN')}>
              {assigneeId === me?.id ? 'Release (unassign me)' : 'Unassign'}
            </DropdownMenuItem>
            {capabilities.canAssign && <DropdownMenuSeparator />}
          </>
        )}
        {capabilities.canAssign && (
          <>
            <DropdownMenuLabel className="text-xs">Assign to</DropdownMenuLabel>
            {members.isLoading && (
              <DropdownMenuItem disabled>Loading members…</DropdownMenuItem>
            )}
            {candidates.map((member) => {
              const name =
                [member.user.firstName, member.user.lastName].filter(Boolean).join(' ') ||
                member.user.email;
              return (
                <DropdownMenuItem
                  key={member.userId}
                  onSelect={() => run('ASSIGN', member.userId)}
                >
                  <span className="truncate">
                    {name}
                    {member.userId === me?.id ? ' (you)' : ''}
                  </span>
                </DropdownMenuItem>
              );
            })}
            {members.hasNextPage && (
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  void members.fetchNextPage();
                }}
              >
                Show more…
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
