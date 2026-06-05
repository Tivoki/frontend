'use client';

import { useState } from 'react';

import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/shared/ui/kit';

const FRAMEWORKS = ['HTML', 'React', 'Next.js', 'Vue', 'Angular'];

const CODE_SNIPPET = `<!-- Add before </body> tag -->
<script>
  window.tikketiConfig = {
    widgetId: "YOUR_WIDGET_ID"
  };
</script>
<script
  src="https://cdn.tikketi.io/widget.js"
  async
></script>`;

export const InstallationTab = () => {
  const [framework, setFramework] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Add this code to your website before the closing{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&lt;/body&gt;</code>{' '}
          tag.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select value={framework} onValueChange={setFramework}>
          <SelectTrigger className="w-32">
            <span className="text-sm">{framework}</span>
          </SelectTrigger>
          <SelectContent position="popper">
            {FRAMEWORKS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={handleCopy} className="ml-auto gap-1.5">
          <HugeiconsIcon
            icon={copied ? Tick01Icon : Copy01Icon}
            strokeWidth={1.75}
            className="size-3.5"
          />
          {copied ? 'Copied!' : 'Copy code'}
        </Button>
      </div>

      <pre className="custom-scrollbar max-w-full overflow-x-auto rounded-xl border border-border bg-muted p-4 text-xs leading-relaxed text-foreground/80">
        <code>{CODE_SNIPPET}</code>
      </pre>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium text-foreground">Need help?</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Check our{' '}
          <span className="cursor-pointer text-primary hover:underline">maximise guide</span> ↗ or
          contact our{' '}
          <span className="cursor-pointer text-primary hover:underline">support team</span>.
        </p>
      </div>
    </div>
  );
};
