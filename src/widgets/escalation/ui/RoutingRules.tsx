'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  BubbleChatIcon,
  Mail01Icon,
  PencilEdit01Icon,
  TelegramIcon,
  WebhookIcon,
} from '@hugeicons/core-free-icons';

import type { EscalationDestination, RoutingRule } from '~/entities/escalation';
import { DEFAULT_ESCALATION_DESTINATION, ROUTING_RULES } from '~/entities/escalation';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';
import { RoutingRuleActions } from './RoutingRuleActions';
import { RoutingRuleDeleteDialog } from './RoutingRuleDeleteDialog';
import { RoutingRuleFormDialog } from './RoutingRuleFormDialog';

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

const DESTINATIONS = Object.keys({
  telegram: true,
  email: true,
  webhook: true,
  external_chat: true,
}) as EscalationDestination[];

export const RoutingRules = () => {
  const [rules, setRules] = useState<RoutingRule[]>(ROUTING_RULES);
  const [defaultDest, setDefaultDest] = useState<EscalationDestination>(
    DEFAULT_ESCALATION_DESTINATION,
  );
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RoutingRule | null>(null);
  const [isFallbackDialog, setIsFallbackDialog] = useState(false);
  const [deletingRule, setDeletingRule] = useState<RoutingRule | null>(null);

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    setDeletingRule(null);
  };

  const openEdit = (rule: RoutingRule) => {
    setEditingRule(rule);
    setIsFallbackDialog(false);
    setRuleDialogOpen(true);
  };

  const openCreate = () => {
    setEditingRule(null);
    setIsFallbackDialog(false);
    setRuleDialogOpen(true);
  };

  const openFallbackEdit = () => {
    setEditingRule(null);
    setIsFallbackDialog(true);
    setRuleDialogOpen(true);
  };

  const closeRuleDialog = () => {
    setRuleDialogOpen(false);
    setIsFallbackDialog(false);
  };

  return (
    <>
      <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5">
        <h2 className="font-heading text-foreground mb-4 text-base font-semibold">
          Routing rules
        </h2>

        {/* Mobile: card list */}
        <div className="divide-border divide-y md:hidden">
          {rules.map((rule) => (
            <article key={rule.id} className="flex items-start gap-3 py-3 first:pt-0">
              <span className="bg-muted text-foreground flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
                {rule.priority}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground text-sm font-medium">{rule.condition}</p>
                  <div className="flex shrink-0 items-center gap-1">
                    <Switch
                      size="sm"
                      checked={rule.active}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <RoutingRuleActions
                      onEdit={() => openEdit(rule)}
                      onDelete={() => setDeletingRule(rule)}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {rule.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
                    >
                      <HugeiconsIcon
                        icon={DESTINATION_ICON[dest]}
                        strokeWidth={1.75}
                        className="size-3"
                      />
                      {DESTINATION_LABEL[dest]}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <span className="bg-muted text-foreground flex size-6 items-center justify-center rounded-md text-xs font-semibold">
                      {rule.priority}
                    </span>
                  </TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.destinations.map((dest) => (
                        <span
                          key={dest}
                          className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
                        >
                          <HugeiconsIcon
                            icon={DESTINATION_ICON[dest]}
                            strokeWidth={1.75}
                            className="size-3"
                          />
                          {DESTINATION_LABEL[dest]}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      size="sm"
                      checked={rule.active}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <RoutingRuleActions
                      onEdit={() => openEdit(rule)}
                      onDelete={() => setDeletingRule(rule)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-border mt-4 space-y-3 border-t pt-4">
          <Button type="button" variant="outline" size="sm" onClick={openCreate}>
            <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} className="size-4" />
            Add rule
          </Button>

          <div className="bg-muted/50 border-border flex flex-wrap items-center gap-3 rounded-lg border px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-sm font-medium">Fallback</p>
              <p className="text-muted-foreground text-xs">
                Triggered when no rule matches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={defaultDest}
                onValueChange={(v) => setDefaultDest(v as EscalationDestination)}
              >
                <SelectTrigger size="sm" className="w-38">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((dest) => {
                    const Icon = DESTINATION_ICON[dest];
                    return (
                      <SelectItem key={dest} value={dest}>
                        <div className="flex items-center gap-1.5">
                          <HugeiconsIcon
                            icon={Icon}
                            strokeWidth={1.75}
                            className="size-4"
                          />
                          {DESTINATION_LABEL[dest]}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={openFallbackEdit}
              >
                <HugeiconsIcon
                  icon={PencilEdit01Icon}
                  strokeWidth={1.75}
                  className="size-4"
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RoutingRuleFormDialog
        open={ruleDialogOpen}
        rule={editingRule}
        isFallback={isFallbackDialog}
        onClose={closeRuleDialog}
      />
      <RoutingRuleDeleteDialog
        rule={deletingRule}
        onConfirm={deleteRule}
        onClose={() => setDeletingRule(null)}
      />
    </>
  );
};
