'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Delete02Icon, ImageUploadIcon, Tick02Icon } from '@hugeicons/core-free-icons';

import {
  ACCOUNT_INFO,
  COMPANY_NAME_MAX,
  COMPANY_SIZES,
  INDUSTRIES,
} from '~/entities/settings';
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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
} from '~/shared/ui/kit';
import { SettingsInputField } from './SettingsInputField';
import { SettingsSelectField } from './SettingsSelectField';

export const GeneralSettings = () => {
  const [copied, setCopied] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const copyAccountId = async () => {
    await navigator.clipboard.writeText(ACCOUNT_INFO.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Column 1 — Company */}
        <Card>
          <CardHeader>
            <CardTitle>Company information</CardTitle>
            <CardDescription>Update your company details and primary settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingsInputField name="companyName" label="Company name" maxLength={COMPANY_NAME_MAX} />
            <SettingsInputField name="companyEmail" label="Company email" type="email" />

            <div className="grid grid-cols-2 gap-3">
              <SettingsSelectField name="industry" label="Industry" options={INDUSTRIES} />
              <SettingsSelectField name="companySize" label="Company size" options={COMPANY_SIZES} />
            </div>

            <SettingsInputField
              name="website"
              label="Website"
              type="url"
              placeholder="https://example.com"
            />

            <Field>
              <FieldLabel className="text-muted-foreground text-xs">Company logo</FieldLabel>
              <div className="flex items-center gap-3">
                <div className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold">
                  A
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" className="gap-1.5">
                    <HugeiconsIcon icon={ImageUploadIcon} strokeWidth={1.75} className="size-3.5" />
                    Upload new
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-[11px]">PNG, JPG or SVG. Max 2MB.</p>
            </Field>
          </CardContent>
        </Card>

        {/* Column 2 — Account + Danger */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Account details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel className="text-muted-foreground text-xs">Account ID</FieldLabel>
                <div className="relative">
                  <Input
                    readOnly
                    value={ACCOUNT_INFO.id}
                    className="text-muted-foreground pr-10 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={copyAccountId}
                    aria-label="Copy account ID"
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  >
                    <HugeiconsIcon
                      icon={copied ? Tick02Icon : Copy01Icon}
                      strokeWidth={1.75}
                      className="size-4"
                    />
                  </button>
                </div>
              </Field>

              <dl className="divide-border divide-y text-sm">
                <div className="flex items-center justify-between py-2.5 first:pt-0">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-foreground">{ACCOUNT_INFO.createdAt}</dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-muted-foreground">Plan</dt>
                  <dd>
                    <Badge className="bg-primary/10 text-primary border-transparent">
                      {ACCOUNT_INFO.plan}
                    </Badge>
                  </dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteOpen(true)}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive w-full gap-1.5"
              >
                <HugeiconsIcon icon={Delete02Icon} strokeWidth={1.75} className="size-4" />
                Delete account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes your workspace and all associated data. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
