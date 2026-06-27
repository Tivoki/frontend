'use client';

import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BubbleChatIcon,
  Mail01Icon,
  TelegramIcon,
  WebhookIcon,
} from '@hugeicons/core-free-icons';

import type { Escalation, EscalationDestination } from '~/entities/escalation';
import { ESCALATIONS } from '~/entities/escalation';
import { cn, getInitials } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';
import Link from 'next/link';

const DESTINATION_ICON: Record<EscalationDestination, typeof TelegramIcon> = {
  telegram: TelegramIcon,
  email: Mail01Icon,
  webhook: WebhookIcon,
  external_chat: BubbleChatIcon,
};

const DESTINATION_LABEL: Record<EscalationDestination, string> = {
  telegram: 'Telegram',
  email: 'Email',
  webhook: 'Webhook',
  external_chat: 'External Chat',
};

const STATUS_CONFIG: Record<
  Escalation['status'],
  { label: string; dot: string; text: string }
> = {
  waiting_human: {
    label: 'Waiting human',
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  in_progress: {
    label: 'In progress',
    dot: 'bg-primary',
    text: 'text-primary',
  },
  resolved: {
    label: 'Resolved',
    dot: 'bg-success',
    text: 'text-success-foreground',
  },
};

export const EscalatedConversationsPanel = () => {
  const router = useRouter();

  const openEscalation = (id: string) =>
    router.push(`/dashboard/conversations?tab=escalated&id=${id}`);

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
      <section className="border-border bg-background flex h-95 flex-col rounded-2xl border shadow-xs">
        <div className="shrink-0 flex items-center justify-between p-4 sm:p-5">
          <h2 className="font-heading text-foreground text-base font-semibold">
            Escalated conversations
          </h2>
          <Button type="button" variant="link" size="sm" className="h-auto p-0" asChild>
            <Link href="/dashboard/conversations?tab=escalated">View all</Link>
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Mobile: card list */}
          <div className="divide-border divide-y md:hidden">
            {ESCALATIONS.map((escalation) => {
              const status = STATUS_CONFIG[escalation.status];
              const DestIcon = DESTINATION_ICON[escalation.destination];

              return (
                <article
                  key={escalation.id}
                  className="hover:bg-muted/40 cursor-pointer px-4 py-3 transition-colors sm:px-5"
                  onClick={() => openEscalation(escalation.id)}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <Avatar className="size-9 shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(escalation.visitorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-foreground truncate text-sm font-medium">
                            {escalation.visitorName}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {escalation.visitorEmail}
                          </p>
                        </div>
                        <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
                          {escalation.requestedAt}
                        </span>
                      </div>

                      <p className="text-muted-foreground mt-2 line-clamp-2 text-xs">
                        {escalation.reason}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <div
                          className={cn(
                            'flex items-center gap-1.5 text-xs font-medium whitespace-nowrap',
                            status.text,
                          )}
                        >
                          <span className={cn('size-1.5 rounded-full', status.dot)} />
                          {status.label}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                          <HugeiconsIcon
                            icon={DestIcon}
                            strokeWidth={1.75}
                            className="size-4 shrink-0"
                          />
                          <span className="whitespace-nowrap">
                            {DESTINATION_LABEL[escalation.destination]}
                          </span>
                        </div>
                      </div>
                    </div>
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
                  <TableHead className="px-4 sm:px-5">Visitor</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested at</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {ESCALATIONS.map((escalation) => {
                  const status = STATUS_CONFIG[escalation.status];
                  const DestIcon = DESTINATION_ICON[escalation.destination];

                  return (
                    <TableRow
                      key={escalation.id}
                      className="cursor-pointer"
                      onClick={() => openEscalation(escalation.id)}
                    >
                      <TableCell className="px-4 sm:px-5">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8 shrink-0">
                            <AvatarFallback className="text-xs">
                              {getInitials(escalation.visitorName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-foreground leading-tight font-medium">
                              {escalation.visitorName}
                            </p>
                            <p className="text-muted-foreground truncate text-xs">
                              {escalation.visitorEmail}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {escalation.reason}
                      </TableCell>
                      <TableCell>
                        <div className="text-muted-foreground flex items-center gap-1.5">
                          <HugeiconsIcon
                            icon={DestIcon}
                            strokeWidth={1.75}
                            className="size-4 shrink-0"
                          />
                          <span className="whitespace-nowrap">
                            {DESTINATION_LABEL[escalation.destination]}
                          </span>
                        </div>
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
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                        {escalation.requestedAt}
                      </TableCell>
                      <TableCell className="text-muted-foreground">›</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};
