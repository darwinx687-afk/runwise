# Early User Testing Guide

This guide gives early users a 10-minute source-install test flow for Runwise `v0.1.0-preview.0`.

Runwise is in public preview. Do not paste secrets, private customer data, proprietary traces, or full internal reports into public issues.

## 10-Minute Testing Flow

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
pnpm check
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

If `runwise view` starts a local viewer, open the printed localhost URL and stop it with `Ctrl+C` when done.

## What To Look For

- Setup friction during clone, install, or command execution.
- Confusing docs or missing setup context.
- Noisy Doctor findings.
- Missing Doctor findings.
- Missing ecosystem detection.
- Unclear report wording.
- Whether Chinese docs feel natural.
- Whether generated reports are useful for internal AI project review.
- Whether replay reports make risky runs easier to review.
- Whether Failure-to-Eval output is useful as an eval case draft.

## What To Report

Open a GitHub issue with:

- The command you ran.
- Your OS, Node.js version, and pnpm version.
- The expected result.
- The actual result.
- A safe redacted excerpt if needed.
- Whether your project includes AI Agent, MCP, RAG, or LLM application traces.

Use the Bug Report, Feature Request, or Integration Request template depending on the feedback type.

## Good Minimal Feedback Examples

- "Doctor flags missing eval coverage, but this repo stores evals under `tests/evals/`; here are sanitized file names."
- "Trace replay is readable, but approval request and approval response should be grouped together."
- "Failure-to-Eval output is useful, but the Markdown should show prohibited behavior earlier."
- "China-ready detection misses this provider pattern based on sanitized `OPENAI_BASE_URL` docs."
