# Command Reference

Run commands from the repository root after `pnpm install`.

```bash
pnpm exec runwise doctor
pnpm exec runwise doctor --cwd . --output .runwise
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace validate examples/traces
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

## Notes

- `doctor` writes JSON, Markdown, and static HTML reports.
- `view` serves the local Dashboard Viewer from `.runwise/runwise-report.json`.
- `trace validate` validates one trace file or a directory of trace JSON files.
- Directory trace validation may exit with code `1` if invalid fixtures are included.
- `trace replay` writes static replay Markdown under `.runwise/replays/`.
- `eval generate` writes JSON, YAML, and Markdown eval case files under `.runwise/evals/`.
- Runwise does not call models, external APIs, or hosted services for these commands.
