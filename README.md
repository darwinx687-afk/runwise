# Runwise

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise is an open-source readiness, tracing, replay, and eval toolkit for AI agents, MCP servers, and LLM applications.

Runwise is local-first. The current quality gate validates workspace structure, package health, report generation, and TypeScript package checks where available.

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
.runwise/runwise-report.html
```

Validate the local workspace before handoff:

```bash
pnpm check
pnpm check:types
pnpm test
```

## Core Features

- Rule-based local Doctor checks for workspace shape, package manager state, TypeScript config, governance files, AI indicators, MCP indicators, eval coverage, and trace coverage.
- JSON, Markdown, and static HTML reports for reviewable readiness evidence.
- Shared TypeScript schemas for Doctor rules, findings, scoring, and reports.
- Package boundaries for future tracing, replay, eval, integrations, GitHub Action, dashboard, and docs work.

## Doctor Rule Engine

Runwise Doctor runs local readiness rules and does not require API keys, network access, cloud services, login, billing, or a database.

- Findings include English and Chinese text.
- Blocking findings identify loop-governance issues that should be fixed first.
- Non-blocking findings show readiness gaps without stopping local report generation.
- Reports include rule execution counts, scoring, and a short fix-first section.

## Static HTML Report

Runwise generates a self-contained local HTML report that can be opened directly in a browser, shared as an artifact, or used as a baseline for future dashboards.

## Local Dashboard Viewer

After running `runwise doctor`, start the local viewer:

```bash
pnpm exec runwise view
```

The viewer reads `.runwise/runwise-report.json` locally and does not upload project data.

## Trace Schema and Validation

Runwise defines a lightweight local trace format for AI Agent, MCP, RAG and LLM application runs. You can validate trace files before using them for replay, eval generation, or future observability workflows.

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

## Trace Replay

After validating a trace, Runwise can produce a static replay report. Replay reads the trace and explains the run timeline, risk points, approval flow, and errors without re-running the agent or calling any model.

```bash
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
```

## GitHub Action

Runwise can be used as a CI readiness gate. It runs locally in GitHub Actions, generates JSON/Markdown/HTML reports, writes a job summary, and can fail the workflow on blocking findings, critical findings, or a minimum score threshold.

Current local self-check usage:

```yaml
- uses: ./
  with:
    min-score: "70"
    fail-on-blocking: "true"
```

Intended future tagged usage after a public release:

```yaml
- uses: runwise-ai/runwise@v0
  with:
    min-score: "70"
    fail-on-blocking: "true"
    fail-on-severity: "critical"
```

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
  reporter/                  JSON, Markdown, and HTML report generation.
  integrations/              Integration adapter boundary.
  github-action/             GitHub Action summary and threshold helper.
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
- Phase 5: GitHub Action readiness check.
- Phase 6: Trace schema and validation.
- Phase 7: Trace replay.

## Contributing

Runwise is intentionally small in Phase 6. Please read [CONTRIBUTING.md](./CONTRIBUTING.md), [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md), and [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md) before proposing changes.

## License

Runwise is released under the [MIT License](./LICENSE).
