import { AiBrain01Icon, Clock01Icon, Tag01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { STATUS_LABELS, STATUS_STYLES } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { cn } from '~/shared/lib';
import { Badge } from '~/shared/ui/kit';

interface ConversationInfoProps {
  conversation: Conversation | null;
}

export const ConversationInfo = ({ conversation }: ConversationInfoProps) => {
  if (!conversation) {
    return (
      <div className="border-border text-muted-foreground flex h-full items-center justify-center border-l text-sm">
        No conversation selected
      </div>
    );
  }

  return (
    <div className="border-border bg-background flex h-full flex-col overflow-y-auto border-l">
      <div className="border-border border-b p-4">
        <h3 className="text-foreground mb-3 text-sm font-semibold">Details</h3>
        <dl className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground text-xs">Status</dt>
            <dd>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                  STATUS_STYLES[conversation.status],
                )}
              >
                {STATUS_LABELS[conversation.status]}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground text-xs">Source</dt>
            <dd className="text-foreground text-xs">
              {conversation.source ?? 'Web widget'}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground text-xs">Assigned to</dt>
            <dd className="text-foreground text-xs">{conversation.assignedTo ?? '—'}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground text-xs">Language</dt>
            <dd className="text-foreground text-xs">
              {conversation.language ?? 'English'}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground text-xs">Created at</dt>
            <dd className="text-foreground text-xs">{conversation.createdAt ?? '—'}</dd>
          </div>
        </dl>
      </div>

      <div className="border-border border-b p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              icon={AiBrain01Icon}
              strokeWidth={1.75}
              className="text-primary size-4"
            />
            <h3 className="text-foreground text-sm font-semibold">AI Summary</h3>
          </div>
          <button type="button" className="text-primary text-xs hover:underline">
            Regenerate
          </button>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {conversation.aiSummary ?? 'No summary available.'}
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
          <button type="button" className="text-primary text-xs hover:underline">
            Add tag
          </button>
        </div>
        {conversation.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {conversation.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">No tags added</p>
        )}
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
          {conversation.events?.map((event) => (
            <div key={event.id} className="flex items-start gap-2.5">
              <div className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
              <div>
                <p className="text-foreground text-xs">{event.description}</p>
                <p className="text-muted-foreground text-xs">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
