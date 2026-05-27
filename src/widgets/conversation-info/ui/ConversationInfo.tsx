import { HugeiconsIcon } from '@hugeicons/react';
import { AiBrain01Icon, Tag01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { STATUS_STYLES, STATUS_LABELS } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { cn } from '~/shared/lib';
import { Badge } from '~/shared/ui/kit';

interface ConversationInfoProps {
  conversation: Conversation | null;
}

export const ConversationInfo = ({ conversation }: ConversationInfoProps) => {
  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center border-l border-border text-sm text-muted-foreground">
        No conversation selected
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto border-l border-border bg-background">
      <div className="border-b border-border p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Details</h3>
        <dl className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">Status</dt>
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
            <dt className="text-xs text-muted-foreground">Source</dt>
            <dd className="text-xs text-foreground">{conversation.source ?? 'Web widget'}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">Assigned to</dt>
            <dd className="text-xs text-foreground">{conversation.assignedTo ?? '—'}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">Language</dt>
            <dd className="text-xs text-foreground">{conversation.language ?? 'English'}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">Created at</dt>
            <dd className="text-xs text-foreground">{conversation.createdAt ?? '—'}</dd>
          </div>
        </dl>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={1.75} className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
          </div>
          <button type="button" className="text-xs text-primary hover:underline">
            Regenerate
          </button>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {conversation.aiSummary ?? 'No summary available.'}
        </p>
      </div>

      <div className="border-b border-border p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Tag01Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Conversation tags</h3>
          </div>
          <button type="button" className="text-xs text-primary hover:underline">
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
          <p className="text-xs text-muted-foreground">No tags added</p>
        )}
      </div>

      <div className="p-4 max-h-70 overflow-y-auto">
        <div className="mb-3 flex items-center gap-1.5">
          <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Events</h3>
        </div>
        <div className="space-y-3">
          {conversation.events?.map((event) => (
            <div key={event.id} className="flex items-start gap-2.5">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <div>
                <p className="text-xs text-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
