# v0.1.1 Feedback Monitoring

This document defines what to watch after `v0.1.1-preview.0`.

Do not create GitHub Issues automatically from this document.

## Release Links

- GitHub: https://github.com/darwinx687-afk/runwise
- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

## What To Watch

### First-run Clarity

- Do users find the right command quickly?
- Do they notice this is source-install only?
- Do they understand why `pnpm@9.15.4` is recommended?
- Do Corepack or global pnpm differences cause friction?

### Install Problems

Watch for:

- Node.js version mismatch
- missing pnpm
- missing Corepack
- lockfile or install warnings
- confusion between `pnpm install` and `npx -y pnpm@9.15.4 install --frozen-lockfile`

### Doctor Findings

Watch for:

- false positives
- false negatives
- unclear rule IDs
- unclear recommendations
- noisy low/info findings

### Report Readability

Watch for:

- users missing "What to fix first"
- confusion around score
- severity sections that are hard to scan
- dashboard empty states
- report content that is hard to share with a team

### Trace / Replay / Eval Terms

Watch for:

- confusion about trace schema
- confusion about static replay versus re-running an agent
- confusion about Failure-to-Eval versus executing evals
- requests for Promptfoo-compatible exports

### Comparison Questions

Watch for:

- "Is this like Langfuse?"
- "Is this like Promptfoo?"
- "Is this for Dify or Open WebUI?"
- "When should I use Runwise first?"

### Plugin Interest

Watch for:

- requests for MCP rule packs
- requests for RAG rule packs
- requests for China-ready provider checks
- requests for team policy checks
- assumptions that plugin support already exists

### npm Requests

Watch for:

- requests for `npm install -g runwise`
- confusion about source-install only
- package name expectations
- publish timing questions

## Suggested GitHub Labels

```text
type: feedback
type: docs
type: feature
area: doctor
area: report
area: trace
area: eval
area: ecosystem
area: docs
area: install
area: release
```

## Feedback Triage

For each useful comment, capture:

- source
- link, if public
- summary
- whether it is actionable
- likely area label
- whether it needs a GitHub Issue
- whether secrets or private data must be redacted

## Recommended Next Action

Use `v0.1.1-preview.0` feedback to decide between:

- Phase 11M - monitor feedback and make small follow-up fixes
- Phase 12A - local JSON rule pack MVP
- New Project Research - next AI open-source direction
