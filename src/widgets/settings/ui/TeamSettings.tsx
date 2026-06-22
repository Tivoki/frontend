'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserAdd01Icon } from '@hugeicons/core-free-icons';

import { TEAM_MEMBERS } from '~/entities/settings';
import type { TeamMember, TeamRole } from '~/entities/settings';
import { cn, getInitials } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
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

const INVITABLE_ROLES: TeamRole[] = ['Admin', 'Agent', 'Viewer'];

const ROLE_BADGE: Record<TeamRole, string> = {
  Owner: 'bg-primary/10 text-primary border-transparent',
  Admin: 'bg-muted text-foreground border-transparent',
  Agent: 'bg-muted text-muted-foreground border-transparent',
  Viewer: 'bg-muted text-muted-foreground border-transparent',
};

export const TeamSettings = () => {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamRole>('Agent');

  const removeMember = (id: string) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const sendInvite = () => {
    if (!email) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        status: 'invited',
      },
    ]);
    setEmail('');
    setRole('Agent');
    setInviteOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Manage who has access to this workspace.</CardDescription>
        <CardAction>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => setInviteOpen(true)}
          >
            <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={1.75} className="size-4" />
            Invite member
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        {/* Mobile: cards */}
        <div className="divide-border divide-y md:hidden">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="text-xs">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {member.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">{member.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge className={ROLE_BADGE[member.role]}>{member.role}</Badge>
                  {member.status === 'invited' && (
                    <Badge className="border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      Invited
                    </Badge>
                  )}
                </div>
              </div>
              {member.role !== 'Owner' && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => removeMember(member.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 sm:px-5">Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="px-4 sm:px-5">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="text-xs">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-foreground leading-tight font-medium">
                          {member.name}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={ROLE_BADGE[member.role]}>{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'text-xs font-medium capitalize',
                        member.status === 'active'
                          ? 'text-success-foreground'
                          : 'text-amber-600 dark:text-amber-400',
                      )}
                    >
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {member.role !== 'Owner' && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeMember(member.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
            <DialogDescription>Send an invite to join this workspace.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Field>
              <FieldLabel
                htmlFor="invite-email"
                className="text-muted-foreground text-xs"
              >
                Email
              </FieldLabel>
              <Input
                id="invite-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="invite-role" className="text-muted-foreground text-xs">
                Role
              </FieldLabel>
              <Select value={role} onValueChange={(v) => setRole(v as TeamRole)}>
                <SelectTrigger id="invite-role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVITABLE_ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
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
            <Button type="button" disabled={!email} onClick={sendInvite}>
              Send invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
