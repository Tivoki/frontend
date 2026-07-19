import type { KnowledgeBaseSource } from '~/entities/knowledge-base-source';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/shared/ui/kit';
import { SourceTableRow } from './SourceTableRow';

interface SourcesTableProps {
  sources: KnowledgeBaseSource[];
  onEdit: (source: KnowledgeBaseSource) => void;
  onReindex: (source: KnowledgeBaseSource) => void;
  onDelete: (source: KnowledgeBaseSource) => void;
  reindexingSourceId: string | null;
}

export function SourcesTable({
  sources,
  onEdit,
  onReindex,
  onDelete,
  reindexingSourceId,
}: SourcesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="text-muted-foreground pl-4 text-xs font-medium">
            Source
          </TableHead>
          <TableHead className="text-muted-foreground text-center text-xs font-medium">
            Type
          </TableHead>
          <TableHead className="text-muted-foreground text-center text-xs font-medium">
            Documents
          </TableHead>
          <TableHead className="text-muted-foreground hidden text-center text-xs font-medium sm:table-cell">
            Chunks
          </TableHead>
          <TableHead className="text-muted-foreground hidden text-center text-xs font-medium md:table-cell">
            Updated
          </TableHead>
          <TableHead className="text-muted-foreground text-center text-xs font-medium">
            Status
          </TableHead>
          <TableHead className="pr-2" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sources.map((source) => (
          <SourceTableRow
            key={source.id}
            source={source}
            onEdit={() => onEdit(source)}
            onReindex={() => onReindex(source)}
            onDelete={() => onDelete(source)}
            isReindexing={reindexingSourceId === source.id}
          />
        ))}
      </TableBody>
    </Table>
  );
}
