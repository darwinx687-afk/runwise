# Architecture

Runwise uses a pnpm monorepo with TypeScript-first package boundaries.

## Workspace Layout

```text
apps/dashboard
apps/docs
packages/cli
packages/core
packages/schemas
packages/reporter
packages/integrations
packages/github-action
examples/mcp-demo
examples/rag-demo
examples/browser-agent-demo
examples/enterprise-workflow-demo
docs/en
docs/zh-CN
```

## Package Roles

- `@runwise/cli`: command-line entrypoint.
- `@runwise/core`: shared domain primitives.
- `@runwise/schemas`: shared schema and manifest contracts.
- `@runwise/reporter`: report formatting boundary.
- `@runwise/integrations`: integration adapter boundary.
- `@runwise/github-action`: GitHub Action boundary.

## Phase 0 Runtime

The only runtime behavior in Phase 0 is the CLI doctor placeholder. Real scanning, tracing, replay, and eval logic starts in Phase 1 or later.
