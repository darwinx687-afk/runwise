# Runwise

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise is an open-source readiness, tracing, replay, and eval toolkit for AI agents, MCP servers, and LLM applications.

## Quick Start

Run the local Doctor scanner from the project root:

```bash
pnpm install
pnpm exec runwise doctor
```

Runwise writes local reports to:

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
```

## Core Features

- Rule-based local Doctor checks for workspace shape, package manager state, TypeScript config, governance files, AI indicators, MCP indicators, eval coverage, and trace coverage.
- JSON and Markdown reports for reviewable readiness evidence.
- Shared TypeScript schemas for Doctor rules, findings, scoring, and reports.
- Package boundaries for future tracing, replay, eval, integrations, GitHub Action, dashboard, and docs work.

## Doctor Rule Engine

Runwise Doctor runs local readiness rules and does not require API keys, network access, cloud services, login, billing, or a database.

- Findings include English and Chinese text.
- Blocking findings identify loop-governance issues that should be fixed first.
- Non-blocking findings show readiness gaps without stopping local report generation.
- Reports include rule execution counts, scoring, and a short fix-first section.

## Architecture Overview

Runwise is a pnpm monorepo with TypeScript-first packages.

```text
apps/
  dashboard/                 Future local dashboard shell.
  docs/                      Future documentation app shell.
packages/
  cli/                       Runwise command-line interface.
  core/                      Local scanner, rule engine, and scoring logic.
  schemas/                   Shared TypeScript schema contracts.
  reporter/                  JSON and Markdown report generation.
  integrations/              Integration adapter boundary.
  github-action/             GitHub Action package boundary.
examples/
  mcp-demo/                  Future MCP server demo.
  rag-demo/                  Future RAG app demo.
  browser-agent-demo/        Future browser-agent demo.
  enterprise-workflow-demo/  Future enterprise workflow demo.
docs/
  en/                        English docs.
  zh-CN/                     Simplified Chinese docs.
```

## Roadmap

- Phase 0: Project foundation, governance files, workspace setup, and CLI placeholder.
- Phase 1: Runwise Doctor CLI with first real local readiness checks.
- Phase 2: Rule-based Doctor engine and scoring refinement.
- Phase 3: Report system refinement and HTML report.
- Phase 4: Dashboard and docs refinement.

## Contributing

Runwise is intentionally small in Phase 2. Please read [CONTRIBUTING.md](./CONTRIBUTING.md), [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md), and [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md) before proposing changes.

## License

Runwise is released under the [MIT License](./LICENSE).
