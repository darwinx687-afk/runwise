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

## Quality Gate

The root `pnpm check` command runs `scripts/check-workspace.mjs`. It is the deterministic workspace gate for the current phase and validates:

- Required workspace directories for apps, packages, examples, and bilingual docs.
- Required governance and bilingual README files.
- Required package entry files: `package.json`, `tsconfig.json`, and `src/index.ts`.
- Parseable package JSON files.
- TypeScript source syntax/transpile checks through the local esbuild dependency.
- No tracked generated `.runwise/` report artifacts.

The root `pnpm check:types` command runs the TypeScript syntax/transpile portion of the same gate directly.

Each package shell keeps a package-level `check` script using `tsc --noEmit -p tsconfig.json`. Package `tsconfig.json` files are isolated to `src/**/*.ts`; the repository does not yet use a root project-reference graph. In the current local path, root-wide `tsc --noEmit` has shown intermittent hangs, so it is not the root quality gate until the TypeScript workspace shape is revisited in a later phase.
