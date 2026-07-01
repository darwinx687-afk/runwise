# First Run Walkthrough

This walkthrough gets you from a fresh clone to a local Runwise report. It does not require an API key and does not upload project data.

Runwise is in public preview and currently runs from source.

## 1. Clone the repo

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
```

## 2. Install dependencies

```bash
pnpm install
```

If your global pnpm behaves differently, use the package manager version declared in `package.json` or enable Corepack.

## 3. Run checks

```bash
pnpm check
pnpm test
```

These commands confirm the workspace and CLI fixtures are healthy before you generate reports.

## 4. Run doctor

```bash
pnpm exec runwise doctor
```

This checks the current project and writes local reports under `.runwise/`:

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

`.runwise/` is generated locally and ignored by git.

## 5. Open the local viewer

```bash
pnpm exec runwise view
```

The viewer reads `.runwise/runwise-report.json` from your machine. It does not upload the report.

## 6. Try trace validation

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

This checks a local `runwise.agent_trace` fixture and reports whether the structure is valid.

## 7. Try trace replay

```bash
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
```

Replay creates a static Markdown review of the trace. It explains timeline, risk, approvals, and errors without re-running an agent or calling a model.

## 8. Generate an eval case

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

This turns the reviewed trace into local eval case draft files. Runwise generates the files only; it does not execute evals or call models.

## 9. What to do if something fails

- Check that you are using Node.js 20 or newer.
- Check that pnpm matches the `packageManager` field in `package.json`.
- Run `pnpm install` again if workspace packages are missing.
- Delete `.runwise/` only if you want to regenerate local reports from scratch.
- If trace validation fails, read the validation message first. Invalid fixtures are included on purpose for testing.

Next: open the [Example Gallery](./EXAMPLE_GALLERY.md) to try Runwise against smaller sample projects.
