# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # ESLint (eslint-config-next + prettier rules)
pnpm format       # Prettier write
pnpm format:check # Prettier check (CI)
npx tsc --noEmit  # type-check without building
```

No test runner is configured.

## Architecture

### Feature-Sliced Design (FSD)

The `src/` directory follows strict FSD layering. **Upper layers may import from lower ones only** — never the reverse:

```
app        → providers, root layout, global CSS
views      → full pages (one per route), compose widgets
widgets    → self-contained UI blocks with their own data/state
features   → user-facing actions (search, switch-workspace, notifications, …)
entities   → domain types + thin UI cards (conversation, stat, knowledge-base-item)
shared     → lib utilities, ui/kit primitives — no domain knowledge
```

Each slice exposes a public API via its `index.ts`. Import only from the slice root, never from internal paths (e.g. `~/features/notifications`, not `~/features/notifications/ui/NotificationsButton`).

Inside a slice, the standard sub-folders are `ui/` and `model/`. Types live in `model/types.ts`.

### Path alias

`~/` resolves to `src/` (configured in `tsconfig.json` and understood by Next.js).

### UI layer (`shared/ui/kit`)

Headless components built on **Radix UI** (`radix-ui` package — the monorepo edition, not individual `@radix-ui/*` packages). Styled with Tailwind CSS v4 and `class-variance-authority`. The kit re-exports everything through `shared/ui/kit/index.ts` — always import from there.

`shared/ui/primitives` holds project-specific non-kit components (Logo, HelpCard).

### Icons

Use **`@hugeicons/react`** (`HugeiconsIcon` component) with icons from **`@hugeicons/core-free-icons`**. Never use inline SVGs.

```tsx
import { BellDotIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

<HugeiconsIcon icon={BellDotIcon} strokeWidth={1.75} className="size-5" />;
```

### Styling

Tailwind CSS v4 (PostCSS plugin). `cn()` from `~/shared/lib` merges class names (`clsx` + `tailwind-merge`). Prettier auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`.

### Forms

`react-hook-form` + `zod` for validation. Resolvers via `@hookform/resolvers/zod`.

### Charts

`recharts` v3 wrapped through `shared/ui/kit/chart.tsx`.

## Code conventions

- Type imports must be separate: `import type { Foo } from '...'` (enforced by ESLint rule `@typescript-eslint/consistent-type-imports`).
- `'use client'` directive is required on any component that uses React state/effects or browser APIs.
- Mock data lives co-located in the feature's `ui/` file (constants at the top). No separate mock files.
- **One component per file.** Each React component must live in its own file named after the component (e.g. `UserCard.tsx` for `UserCard`). Never define multiple exported or non-trivial components in the same file.
