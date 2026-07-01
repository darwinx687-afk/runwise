# Runwise v0.1.0-preview.0

## Summary

Runwise `v0.1.0-preview.0` is the first release candidate draft for the public preview of Runwise, a local-first readiness, trace replay, and eval generation toolkit for AI agents, MCP servers, RAG, and LLM applications.

This release candidate is prepared for review. The git tag and GitHub Release have not been created yet.

## Included

- Local-first Runwise Doctor readiness scanner.
- Rule-based readiness engine.
- JSON, Markdown, and static HTML reports.
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
- Official ecosystem partnerships or integrations.

## Install From Source

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
```

## Basic Commands

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

- Distribution is source-based for this release candidate draft.
- Generated `.runwise/` artifacts are local, ignored, and reproducible.
- The GitHub Action is a repository-local composite action until a release tag exists.
- GitHub Actions currently reports a non-blocking Node.js 20 deprecation annotation from referenced actions, while CI passes.

## Deferred

- npm publishing is deferred.
- GitHub Marketplace release is deferred.
- The first preview tag is prepared but not created in this loop.
