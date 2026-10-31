import { cn } from '~/shared/lib';
import { badgeOf } from '../lib/format';
import { BADGE_LABELS, BADGE_STYLES } from '../model/config';
import type { ActiveEscalation, ConversationStatus } from '../model/types';

interface ConversationBadgePillProps {
  status: ConversationStatus;
  escalation: Pick<ActiveEscalation, 'status'> | null;
  className?: string;
}

export const ConversationBadgePill = ({
  status,
  escalation,
  className,
}: ConversationBadgePillProps) => {
  const badge = badgeOf(status, escalation);
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        BADGE_STYLES[badge],
        className,
      )}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
};
