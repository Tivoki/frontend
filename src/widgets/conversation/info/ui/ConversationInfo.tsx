'use client';

import { AiBrain01Icon, Clock01Icon, Tag01Icon } from '@hugeicons/core-free-icons';
import type { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ConversationBadgePill,
  ESCALATION_STATUS_LABELS,
  formatDateTime,
  languageName,
  useConversation,
  useConversationActivities,
} from '~/entities/conversation';
import type { ConversationActivity } from '~/entities/conversation';
import { Skeleton, Tooltip, TooltipContent, TooltipTrigger } from '~/shared/ui/kit';

interface ConversationInfoProps {
  workspaceId: string | null;
  conversationId: string | undefined;
}

const CLOSE_REASON: Record<string, string> = {
  INACTIVITY: 'Closed after inactivity',
  ESCALATION_RESOLVED: 'Resolved by the team',
  LEGACY: 'Closed',
};

const REASON: Record<string, string> = {
  LOW_CONFIDENCE: 'low AI confidence',
  USER_REQUEST: 'visitor asked for a person',
  UI_REQUEST: 'visitor pressed “talk to a person”',
  OFFER_ACCEPTED: 'visitor accepted the handoff offer',
  FALLBACK_RULE: 'visitor left an email',
  AGENT_TAKEOVER: 'taken over from the AI',
};

const describe = (activity: ConversationActivity): string => {
  const who =
    activity.actor.name ?? (activity.actor.type === 'VISITOR' ? 'Visitor' : 'System');
  const payload = activity.payload ?? {};
  switch (activity.type) {
    case 'ESCALATION_OPENED':
      return `Handoff opened (${REASON[String(payload.reason)] ?? 'requested'})`;
    case 'ESCALATION_ASSIGNED':
      return `Assigned to ${String(payload.assigneeName ?? 'a team member')} by ${who}`;
    case 'ESCALATION_UNASSIGNED':
      return `Unassigned by ${who}`;
    case 'ESCALATION_RESOLVED':
      return `Resolved by ${who}`;
    case 'CONVERSATION_CLOSED':
      return payload.reason === 'INACTIVITY'
        ? 'Closed automatically after inactivity'
        : 'Conversation closed';
    case 'CONVERSATION_REOPENED':
      return 'Reopened by a new visitor message';
    default:
      return activity.type;
  }
};

export const ConversationInfo = ({
  workspaceId,
  conversationId,
}: ConversationInfoProps) => {
  const { data: conversation, isPending } = useConversation(workspaceId, conversationId);
  const activities = useConversationActivities(
    workspaceId,
    conversationId,
    conversation?.revision,
  );

  if (!conversationId) {
    return (
      <div className="border-border text-muted-foreground flex h-full items-center justify-center border-l text-sm">
        No conversation selected
      </div>
    );
  }
  if (!conversation) {
    return (
      <div className="border-border h-full space-y-3 border-l p-4">
        {isPending &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
      </div>
    );
  }

  const escalation = conversation.activeEscalation;
  const rows: [string, ReactNode][] = [
    [
      'Status',
      <ConversationBadgePill
        key="status"
        status={conversation.status}
        escalation={escalation}
      />,
    ],
    ['Handled by', conversation.handlingMode === 'HUMAN' ? 'Team' : 'AI assistant'],
    [
      'Assigned to',
      escalation?.assignedTo
        ? (escalation.assignedTo.name ?? 'Former member')
        : escalation
          ? `Nobody yet (${ESCALATION_STATUS_LABELS[escalation.status].toLowerCase()})`
          : '—',
    ],
    ['Source', 'Web widget'],
    ['Language', languageName(conversation.language) ?? '—'],
    ['Created at', formatDateTime(conversation.createdAt)],
  ];
  if (conversation.status === 'CLOSED') {
    rows.push([
      'Closed',
      `${CLOSE_REASON[conversation.closeReason ?? 'LEGACY']}${
        conversation.closedAt ? ` · ${formatDateTime(conversation.closedAt)}` : ''
      }`,
    ]);
  } else if (conversation.idleCloseAt) {
    rows.push(['Auto-closes', formatDateTime(conversation.idleCloseAt)]);
  }

  return (
    <div className="border-border bg-background flex h-full flex-col overflow-y-auto border-l">
      <div className="border-border border-b p-4">
        <h3 className="text-foreground mb-3 text-sm font-semibold">Details</h3>
        <dl className="space-y-2.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground shrink-0 text-xs">{label}</dt>
              <dd className="text-foreground truncate text-right text-xs">{value}</dd>
            </div>
          ))}
        </dl>
        {conversation.status === 'CLOSED' && (
          <p className="text-muted-foreground mt-3 text-xs">
            A new visitor message will reopen this conversation.
          </p>
        )}
      </div>

      <div className="border-border border-b p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <HugeiconsIcon
            icon={AiBrain01Icon}
            strokeWidth={1.75}
            className="text-primary size-4"
          />
          <h3 className="text-foreground text-sm font-semibold">AI Summary</h3>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {conversation.aiSummary ?? 'No summary for this conversation.'}
        </p>
      </div>

      <div className="border-border border-b p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              icon={Tag01Icon}
              strokeWidth={1.75}
              className="text-muted-foreground size-4"
            />
            <h3 className="text-foreground text-sm font-semibold">Conversation tags</h3>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                aria-disabled="true"
                className="text-muted-foreground cursor-not-allowed text-xs"
              >
                Add tag
              </span>
            </TooltipTrigger>
            <TooltipContent>Tags are not available yet</TooltipContent>
          </Tooltip>
        </div>
        <p className="text-muted-foreground text-xs">No tags added</p>
      </div>

      <div className="max-h-70 overflow-y-auto p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <HugeiconsIcon
            icon={Clock01Icon}
            strokeWidth={1.75}
            className="text-muted-foreground size-4"
          />
          <h3 className="text-foreground text-sm font-semibold">Events</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
            <div>
              <p className="text-foreground text-xs">Conversation started</p>
              <p className="text-muted-foreground text-xs">
                {formatDateTime(conversation.createdAt)}
              </p>
            </div>
          </div>
          {[...(activities.data?.items ?? [])].reverse().map((activity) => (
            <div key={activity.id} className="flex items-start gap-2.5">
              <div className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
              <div>
                <p className="text-foreground text-xs">{describe(activity)}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDateTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
