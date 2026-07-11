'use client';

import { Delete01Icon, Globe02Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { DOMAINS } from '~/entities/settings';
import type { Domain, DomainStatus } from '~/entities/settings';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
} from '~/shared/ui/kit';
import { useState } from 'react';

const STATUS_BADGE: Record<DomainStatus, { label: string; className: string }> = {
  verified: {
    label: 'Verified',
    className: 'bg-success/15 text-success-foreground border-transparent',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/15 border-transparent text-amber-600 dark:text-amber-400',
  },
  failed: {
    label: 'Failed',
    className: 'bg-destructive/10 text-destructive border-transparent',
  },
};

export const DomainSettings = () => {
  const [domains, setDomains] = useState<Domain[]>(DOMAINS);
  const [newDomain, setNewDomain] = useState('');

  const addDomain = () => {
    const value = newDomain.trim().toLowerCase();
    if (!value || domains.some((d) => d.domain === value)) return;
    setDomains((prev) => [
      ...prev,
      { id: `d_${Date.now()}`, domain: value, status: 'pending', addedAt: 'Just now' },
    ]);
    setNewDomain('');
  };

  const verifyDomain = (id: string) =>
    setDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'verified' as const } : d)),
    );

  const removeDomain = (id: string) =>
    setDomains((prev) => prev.filter((d) => d.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allowed domains</CardTitle>
        <CardDescription>
          Restrict where your widget can be embedded. Only verified domains can load the
          widget.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Field className="flex-1">
            <FieldLabel htmlFor="new-domain" className="text-muted-foreground text-xs">
              Add a domain
            </FieldLabel>
            <Input
              id="new-domain"
              placeholder="app.example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addDomain();
                }
              }}
            />
          </Field>
          <Button
            type="button"
            className="gap-1.5"
            disabled={!newDomain.trim()}
            onClick={addDomain}
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={1.75} className="size-4" />
            Add domain
          </Button>
        </div>

        <div className="divide-border divide-y">
          {domains.map((domain) => {
            const status = STATUS_BADGE[domain.status];
            return (
              <div key={domain.id} className="flex items-center gap-3 py-3 first:pt-0">
                <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <HugeiconsIcon
                    icon={Globe02Icon}
                    strokeWidth={1.75}
                    className="size-4"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {domain.domain}
                  </p>
                  <p className="text-muted-foreground text-xs">Added {domain.addedAt}</p>
                </div>
                <Badge className={status.className}>{status.label}</Badge>
                {domain.status !== 'verified' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => verifyDomain(domain.id)}
                  >
                    Verify
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${domain.domain}`}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => removeDomain(domain.id)}
                >
                  <HugeiconsIcon
                    icon={Delete01Icon}
                    strokeWidth={1.75}
                    className="size-4"
                  />
                </Button>
              </div>
            );
          })}
        </div>

        {domains.length === 0 && (
          <p className="text-muted-foreground py-6 text-center text-sm">
            No domains added yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
