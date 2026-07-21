'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Escalation, EscalationReason, EscalationStatus } from '~/entities/escalation';
import { useEscalations } from '~/entities/escalation';
import { useActiveWorkspaceId, useWorkspaceHref } from '~/features/switch-workspace';
import { cn } from '~/shared/lib';
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';

const REASON_LABEL: Record<EscalationReason, string> = {
  LOW_CONFIDENCE: 'Low AI confidence',
  USER_REQUEST: 'Visitor requested human',
  FALLBACK_RULE: 'Fallback rule',
};

const STATUS_CONFIG: Record<EscalationStatus, { label: string; dot: string; text: string }> = {
  WAITING_HUMAN: {
    label: 'Waiting human',
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  IN_PROGRESS: {
    label: 'In progress',
    dot: 'bg-primary',
    text: 'text-primary',
  },
  RESOLVED: {
    label: 'Resolved',
    dot: 'bg-success',
    text: 'text-success-foreground',
  },
};

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const formatTime = (iso: string) => timeFormatter.format(new Date(iso));

export const EscalatedConversationsPanel = () => {
  const router = useRouter();
  const workspaceHref = useWorkspaceHref();
  const workspaceId = useActiveWorkspaceId();
  const { data: escalations, isLoading } = useEscalations(workspaceId);

  const openEscalation = (escalation: Escalation) =>
    router.push(workspaceHref(`conversations?tab=escalated&id=${escalation.conversationId}`));

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
      <section className="border-border bg-background flex h-95 flex-col rounded-2xl border shadow-xs">
        <div className="flex shrink-0 items-center justify-between p-4 sm:p-5">
          <h2 className="font-heading text-foreground text-base font-semibold">
            Escalated conversations
          </h2>
          <Button type="button" variant="link" size="sm" className="h-auto p-0" asChild>
            <Link href={workspaceHref('conversations?tab=escalated')}>View all</Link>
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3 px-4 py-3 sm:px-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : !escalations || escalations.length === 0 ? (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <p className="text-muted-foreground text-sm">
                No escalations yet. They&apos;ll show up here once a visitor asks for a
                human.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile: card list */}
              <div className="divide-border divide-y md:hidden">
                {escalations.map((escalation) => {
                  const status = STATUS_CONFIG[escalation.status];

                  return (
                    <article
                      key={escalation.id}
                      className="hover:bg-muted/40 cursor-pointer px-4 py-3 transition-colors sm:px-5"
                      onClick={() => openEscalation(escalation)}
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <p className="text-foreground truncate font-mono text-xs">
                          {escalation.conversationId}
                        </p>
                        <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
                          {formatTime(escalation.createdAt)}
                        </span>
                      </div>

                      <p className="text-muted-foreground mt-2 text-xs">
                        {REASON_LABEL[escalation.reason]}
                      </p>

                      <div
                        className={cn(
                          'mt-3 flex items-center gap-1.5 text-xs font-medium',
                          status.text,
                        )}
                      >
                        <span className={cn('size-1.5 rounded-full', status.dot)} />
                        {status.label}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Desktop: table */}
              <div className="hidden md:block">
                <Table className="min-w-180">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 sm:px-5">Conversation</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned to</TableHead>
                      <TableHead>Requested at</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escalations.map((escalation) => {
                      const status = STATUS_CONFIG[escalation.status];

                      return (
                        <TableRow
                          key={escalation.id}
                          className="cursor-pointer"
                          onClick={() => openEscalation(escalation)}
                        >
                          <TableCell className="px-4 font-mono text-xs sm:px-5">
                            {escalation.conversationId}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {REASON_LABEL[escalation.reason]}
                          </TableCell>
                          <TableCell>
                            <div
                              className={cn(
                                'flex items-center gap-1.5 text-xs font-medium whitespace-nowrap',
                                status.text,
                              )}
                            >
                              <span className={cn('size-1.5 rounded-full', status.dot)} />
                              {status.label}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {escalation.assignedToUserId ?? 'Unassigned'}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                            {formatTime(escalation.createdAt)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">›</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
