# AGENTS.md

Instructions for coding agents working in the dashboard repository.
These rules are shared with `CLAUDE.md`; keep shared project guidance consistent between the two files.

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
pnpm exec tsc --noEmit  # type-check without building
pnpm test         # unit tests for pure logic (node --test)
```

`pnpm test` runs Node's built-in test runner on `src/**/*.test.ts` (type stripping, no extra deps). Keep tested modules free of `~/` value imports (relative `.ts` imports only) — it covers pure cache/stream/dedupe logic, not JSX.

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

### Conversations inbox

Real data from the backend inbox API (`docs/conversations-inbox.md` in the backend repo). `entities/conversation` holds API types (generated), query keys (always workspace-scoped), list/detail/history/read hooks and pure helpers; `features/conversation-reply` (pending/failed/retry replies, in-memory drafts), `features/conversation-actions` (take over, assign, resolve with `expectedRevision`), `features/conversation-realtime` (one workspace SSE stream per tab via `shared/api/event-stream.ts`; hints only — the cache is refreshed from the API, inbox pages restart from the first page). The detail is loaded by `?id=` independently of the list; 403/404 show "not available".

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

## Package manager and validation

Use `pnpm` and run commands from this repository's root. For code changes, run `pnpm lint` and `pnpm exec tsc --noEmit`; use `pnpm build` when changes affect routing, rendering, or production configuration. Report checks that could not run and why.

`pnpm format` rewrites files across the repository. Prefer formatting only changed files; use `pnpm format:check` for a read-only check.

`src/shared/api/schema.d.ts` is generated from the backend OpenAPI schema. After API contract changes, start the backend locally and run `pnpm generate` instead of hand-editing the generated schema. The configured endpoint is `http://localhost:8080/api/v1/docs-json`.
