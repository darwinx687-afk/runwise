# Failure-to-Eval

Failure-to-Eval turns a validated trace into reusable local eval case files.

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

Generated files:

```text
.runwise/evals/<runId>-eval.json
.runwise/evals/<runId>-eval.yaml
.runwise/evals/<runId>-eval.md
```

Runwise generates eval cases only. It does not execute evals, call model judges, train models, upload datasets, or re-run agents.
