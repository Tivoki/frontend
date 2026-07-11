'use client';

import { Copy01Icon, Delete01Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { API_KEYS } from '~/entities/settings';
import type { ApiKey, ApiKeyScope } from '~/entities/settings';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';
import { useState } from 'react';

const SCOPES: ApiKeyScope[] = ['read', 'write', 'admin'];

const SCOPE_BADGE: Record<ApiKeyScope, string> = {
  read: 'bg-muted text-muted-foreground border-transparent',
  write: 'bg-amber-500/15 border-transparent text-amber-600 dark:text-amber-400',
  admin: 'bg-primary/10 text-primary border-transparent',
};

const randomKey = () =>
  `tk_live_${Array.from({ length: 24 }, () => Math.floor(Math.random() * 36).toString(36)).join('')}`;

export const ApiKeysSettings = () => {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [scope, setScope] = useState<ApiKeyScope>('read');
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [revoking, setRevoking] = useState<ApiKey | null>(null);

  const createKey = () => {
    if (!name.trim()) return;
    const full = randomKey();
    setKeys((prev) => [
      {
        id: `k_${Date.now()}`,
        name: name.trim(),
        maskedKey: `${full.slice(0, 8)}••••••••••••${full.slice(-4)}`,
        scope,
        createdAt: 'Just now',
        lastUsed: 'Never',
      },
      ...prev,
    ]);
    setRevealedKey(full);
    setName('');
    setScope('read');
    setCreateOpen(false);
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setRevoking(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API keys</CardTitle>
        <CardDescription>Authenticate requests to the Tikketi API.</CardDescription>
        <CardAction>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => setCreateOpen(true)}
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={1.75} className="size-4" />
            Create key
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4 px-0">
        {revealedKey && (
          <div className="bg-success/10 border-success/20 mx-4 flex flex-wrap items-center gap-2 rounded-lg border p-3 sm:mx-5">
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-xs font-medium">
                Copy your new key now — you won’t be able to see it again.
              </p>
              <code className="text-muted-foreground block truncate font-mono text-xs">
                {revealedKey}
              </code>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(revealedKey)}
            >
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} className="size-4" />
              Copy
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setRevealedKey(null)}
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Mobile: cards */}
        <div className="divide-border divide-y md:hidden">
          {keys.map((key) => (
            <div key={key.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-sm font-medium">{key.name}</p>
                  <Badge className={SCOPE_BADGE[key.scope]}>{key.scope}</Badge>
                </div>
                <code className="text-muted-foreground block truncate font-mono text-xs">
                  {key.maskedKey}
                </code>
                <p className="text-muted-foreground text-xs">Last used {key.lastUsed}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Revoke ${key.name}`}
                className="text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => setRevoking(key)}
              >
                <HugeiconsIcon
                  icon={Delete01Icon}
                  strokeWidth={1.75}
                  className="size-4"
                />
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 sm:px-5">Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead className="px-4 text-right sm:px-5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="text-foreground px-4 font-medium sm:px-5">
                    {key.name}
                  </TableCell>
                  <TableCell>
                    <code className="text-muted-foreground font-mono text-xs">
                      {key.maskedKey}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge className={SCOPE_BADGE[key.scope]}>{key.scope}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {key.lastUsed}
                  </TableCell>
                  <TableCell className="px-4 text-right sm:px-5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setRevoking(key)}
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>Give your key a name and access scope.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Field>
              <FieldLabel htmlFor="key-name" className="text-muted-foreground text-xs">
                Name
              </FieldLabel>
              <Input
                id="key-name"
                placeholder="e.g. Production"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="key-scope" className="text-muted-foreground text-xs">
                Scope
              </FieldLabel>
              <Select value={scope} onValueChange={(v) => setScope(v as ApiKeyScope)}>
                <SelectTrigger id="key-scope" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCOPES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" disabled={!name.trim()} onClick={createKey}>
              Create key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!revoking} onOpenChange={(open) => !open && setRevoking(null)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke key?</AlertDialogTitle>
            <AlertDialogDescription>
              “{revoking?.name}” will stop working immediately. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => revoking && revokeKey(revoking.id)}
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
