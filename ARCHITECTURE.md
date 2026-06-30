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
- `@runwise/core`: local project scanner, rule engine, and scoring engine.
- `@runwise/schemas`: shared schema, rule, finding, scoring, and report contracts.
- `@runwise/reporter`: JSON, Markdown, and static HTML report formatting boundary.
- `@runwise/integrations`: integration adapter boundary.
- `@runwise/github-action`: GitHub Action boundary.

## Current Runtime

The current runtime behavior is `runwise doctor`. It scans the local project, runs structured readiness rules, computes a readiness score, and writes JSON, Markdown, and static HTML reports under `.runwise/`.
