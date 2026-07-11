'use client';

import { UserAdd01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useWorkspaceMembers, WORKSPACE_ROLE_LABELS } from '~/entities/workspace';
import type { WorkspaceMemberWithUser } from '~/entities/workspace';
import { InviteMemberDialog, RemoveMemberDialog } from '~/features/manage-team';
import type { RemovableMember } from '~/features/manage-team';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { getInitials } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';
import { LoadingMoreRow } from '~/shared/ui/primitives';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ROLE_BADGE: Record<string, string> = {
  OWNER: 'bg-primary/10 text-primary border-transparent',
  ADMIN: 'bg-muted text-foreground border-transparent',
  AGENT: 'bg-muted text-muted-foreground border-transparent',
  VIEWER: 'bg-muted text-muted-foreground border-transparent',
};

const memberName = (member: WorkspaceMemberWithUser) => {
  const fullName = [member.user.firstName, member.user.lastName]
    .filter(Boolean)
    .join(' ');
  return fullName || member.user.email;
};

export const TeamSettings = () => {
  const workspaceId = useActiveWorkspaceId();

  const { data, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useWorkspaceMembers(workspaceId);

  const members = data?.pages.flatMap((page) => page.data) ?? [];

  const [inviteOpen, setInviteOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<RemovableMember | null>(null);

  const { ref: sentinelRef } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Manage who has access to this workspace.</CardDescription>
        <CardAction>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            disabled={!workspaceId}
            onClick={() => setInviteOpen(true)}
          >
            <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={1.75} className="size-4" />
            Invite member
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        {isPending && (
          <div className="space-y-3 px-4 py-3 sm:px-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isPending && isError && (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <p className="text-muted-foreground text-sm">Couldn’t load team members.</p>
          </div>
        )}

        {!isPending && !isError && members.length === 0 && (
          <div className="flex items-center justify-center px-4 py-10">
            <p className="text-muted-foreground text-sm">No members yet.</p>
          </div>
        )}

        {!isPending && !isError && members.length > 0 && (
          <>
            {/* Mobile: cards */}
            <div className="divide-border divide-y md:hidden">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback className="text-xs">
                      {getInitials(memberName(member))}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {memberName(member)}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {member.user.email}
                    </p>
                    <div className="mt-1.5">
                      <Badge className={ROLE_BADGE[member.role]}>
                        {WORKSPACE_ROLE_LABELS[member.role]}
                      </Badge>
                    </div>
                  </div>
                  {member.role !== 'OWNER' && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() =>
                        setMemberToRemove({ id: member.id, label: memberName(member) })
                      }
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block">
              <Table className="min-w-150">
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4 sm:px-5">Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="px-4 sm:px-5">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8 shrink-0">
                            <AvatarFallback className="text-xs">
                              {getInitials(memberName(member))}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-foreground leading-tight font-medium">
                              {memberName(member)}
                            </p>
                            <p className="text-muted-foreground truncate text-xs">
                              {member.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={ROLE_BADGE[member.role]}>
                          {WORKSPACE_ROLE_LABELS[member.role]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {member.role !== 'OWNER' && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() =>
                              setMemberToRemove({
                                id: member.id,
                                label: memberName(member),
                              })
                            }
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {isFetchingNextPage && (
              <LoadingMoreRow label="Loading more…" className="px-4 py-4 text-sm" />
            )}

            {hasNextPage && !isFetchingNextPage && (
              <div ref={sentinelRef} aria-hidden className="h-px" />
            )}
          </>
        )}
      </CardContent>

      {workspaceId && (
        <>
          <InviteMemberDialog
            workspaceId={workspaceId}
            open={inviteOpen}
            onOpenChange={setInviteOpen}
          />
          <RemoveMemberDialog
            workspaceId={workspaceId}
            member={memberToRemove}
            onClose={() => setMemberToRemove(null)}
          />
        </>
      )}
    </Card>
  );
};
