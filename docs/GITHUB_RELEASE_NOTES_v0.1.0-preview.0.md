# Runwise v0.1.0-preview.0

## Public Preview Status

This is the first public preview release of Runwise. It is intended for source-based testing, feedback, and early evaluation of the local-first AgentOps workflow.

- Release URL: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- Distribution: source install only

## Summary

Runwise is a local-first readiness, trace replay, and eval generation toolkit for AI agents, MCP servers, RAG systems, and LLM applications. This prerelease focuses on reviewable local evidence before demos, CI gates, and early release reviews.

## Included

- Local-first Runwise Doctor readiness scanner.
- Rule-based readiness engine and readiness score.
- JSON, Markdown, and static HTML Doctor reports.
- Local Dashboard Viewer for generated report JSON.
- Composite GitHub Action readiness gate.
- Local `runwise.agent_trace` validation.
- Static trace replay reports.
- Deterministic Failure-to-Eval generation.
- Local ecosystem compatibility detection.
- Lightweight examples and trace fixtures.
- English and Simplified Chinese documentation.

## Not Included Yet

- npm package publishing.
- GitHub Marketplace listing.
- Hosted service, login, billing, database, or cloud sync.
- Agent runtime orchestration.
- Model calls, model judging, eval execution, or model training.
- Official ecosystem partnerships or official integration claims.

## Install From Source

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
```

## Core Commands

```bash
pnpm check
pnpm check:types
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

## Known Limitations

- This is a prerelease public preview, not a stable release.
- Distribution is source-based; npm publishing remains deferred.
- GitHub Marketplace release remains deferred.
- Generated `.runwise/` artifacts are local, ignored by default, and reproducible.
- The GitHub Action is available from this repository; public versioned action usage should be validated separately before broader adoption.
- GitHub Actions currently reports a non-blocking Node.js 20 deprecation annotation from referenced actions, while CI passes.

## Feedback Welcome

Feedback is especially useful on AI agent readiness rules, trace replay readability, Failure-to-Eval output shape, ecosystem compatibility detection, and China-ready LLM provider signals.
