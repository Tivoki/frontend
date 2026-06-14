import type { LogEntry } from '~/entities/log';
import { LogLevelBadge } from '~/entities/log';
import { getInitials } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const formatTime = (iso: string) => timeFormatter.format(new Date(iso));

interface ActivityLogsTableProps {
  entries: LogEntry[];
}

export const ActivityLogsTable = ({ entries }: ActivityLogsTableProps) => {
  return (
    <>
      {/* Mobile: card list */}
      <div className="divide-border divide-y md:hidden">
        {entries.map((entry) => (
          <article key={entry.id} className="px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <LogLevelBadge level={entry.level} />
              <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
                {formatTime(entry.timestamp)}
              </span>
            </div>

            <p className="text-foreground mt-2 text-sm font-medium">{entry.message}</p>
            <code className="text-muted-foreground mt-1 block font-mono text-xs">
              {entry.action}
            </code>

            <div className="text-muted-foreground mt-3 flex items-center gap-2">
              <Avatar className="size-6 shrink-0">
                <AvatarFallback className="text-[10px]">
                  {getInitials(entry.actorName)}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 truncate text-xs">{entry.actorName}</span>
              <span className="text-muted-foreground/50">·</span>
              <span className="shrink-0 text-xs">{entry.source}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <Table className="min-w-192">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 sm:px-5">Level</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="px-4 text-right sm:px-5">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="px-4 align-top sm:px-5">
                  <LogLevelBadge level={entry.level} />
                </TableCell>
                <TableCell className="align-top">
                  <p className="text-foreground font-medium">{entry.message}</p>
                  <code className="text-muted-foreground font-mono text-xs">
                    {entry.action}
                  </code>
                </TableCell>
                <TableCell className="align-top">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7 shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(entry.actorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-foreground leading-tight">{entry.actorName}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {entry.actorEmail}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground align-top whitespace-nowrap">
                  {entry.source}
                </TableCell>
                <TableCell className="text-muted-foreground px-4 text-right align-top text-xs whitespace-nowrap sm:px-5">
                  {formatTime(entry.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
