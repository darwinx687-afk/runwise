# Product Spec

## Positioning

Runwise is an open-source readiness, tracing, replay, and eval toolkit for AI agents, MCP servers, and LLM applications.

## Users

- Developers building local AI agent prototypes.
- Teams shipping MCP servers or LLM application workflows.
- Maintainers who need readiness evidence before CI, demos, or releases.

## Phase 0 Deliverable

- A pnpm monorepo.
- TypeScript-first package shells.
- Bilingual README files.
- Governance files.
- A minimal CLI with a doctor placeholder command.

## Future Product Capabilities

- Readiness doctor checks.
- Trace capture contracts.
- Local trace schema validation.
- Static trace replay reports.
- Failure-to-Eval case generation from validated traces.
- Local ecosystem compatibility detection and examples.
- Open-source launch documentation and repository presentation.
- Replay fixtures and runners.
- Eval adapters and reporting.
- CI and GitHub Action integration.
- Optional local dashboard.
- Future local plugin architecture exploration for reviewable JSON rule packs.

## Future Plugin Direction

Plugin support is not a current feature.

Runwise may later support local rule packs so teams can add project-specific checks without changing core. The preferred first direction is JSON rule packs that are deterministic, reviewable, local-first, and free of model calls or network access.
