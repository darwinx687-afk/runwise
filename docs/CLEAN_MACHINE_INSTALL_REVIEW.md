# Clean-machine Install Review

This review checks whether a new developer can clone Runwise, install dependencies with the repo-declared pnpm version, run checks, generate reports, open the local viewer, and try trace/replay/eval commands.

## Review Summary

- Review date: 2026-07-01
- Clean clone path: `/tmp/runwise-clean-install-review/runwise`
- Remote tested: `https://github.com/darwinx687-afk/runwise`
- Commit tested: `401f871 docs: improve v0.1.1 usability guidance`
- Result: passed with small documentation refinements

## Environment

```text
node: v25.8.2
npm: 11.11.1
pnpm: 9.15.4
corepack: not available in this shell
git: 2.50.1 (Apple Git-155)
packageManager: pnpm@9.15.4
```

Global pnpm matched the repo-declared pnpm version. Corepack was not available, so the `npx -y pnpm@9.15.4 ...` path was the reliable fallback.

## Install Result

Command:

```bash
CI=true npx -y pnpm@9.15.4 install --frozen-lockfile
```

Result: passed.

No actionable install warnings appeared.

## Check And Test Result

Commands:

```bash
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 check:types
npx -y pnpm@9.15.4 test
```

Result: passed.

The test suite reported:

```text
Runwise CLI, trace, eval, viewer, and action tests passed.
```

## Doctor Result

Command:

```bash
npx -y pnpm@9.15.4 exec runwise doctor
```

Result: passed.

Summary:

- Score: `97/100`
- Rules: `12 passed, 3 failed, 2 not applicable, 0 blocking`
- Findings: `3 total, 0 critical, 0 high, 0 medium, 1 low, 2 info`
- Integrations detected: `10`

Generated files:

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

`.runwise/` was ignored by git.

## Viewer Smoke Result

Command shape:

```bash
npx -y pnpm@9.15.4 exec runwise view --port 43118
```

Smoke checks:

- `http://127.0.0.1:43118/health` returned `ok: true`.
- `http://127.0.0.1:43118/` returned dashboard HTML.
- No `runwise view` process remained after the smoke test.

Result: passed.

## Trace / Replay / Eval Result

Commands:

```bash
npx -y pnpm@9.15.4 exec runwise trace validate examples/traces/valid-agent-run.json
npx -y pnpm@9.15.4 exec runwise trace replay examples/traces/mcp-risk-agent-run.json
npx -y pnpm@9.15.4 exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

Result: passed.

Generated files were written under `.runwise/replays/` and `.runwise/evals/`.

## `--cwd` Result

Required smoke command:

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise-mcp-demo
```

Result: passed.

Observation: relative `--output` paths are resolved inside the scanned `--cwd` project. The command above generated files under:

```text
examples/mcp-demo/.runwise-mcp-demo/
```

Because `.runwise-mcp-demo/` is a custom output directory, it is not ignored by the existing `.gitignore`. For first-time docs, the safer recommended command is:

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise
```

That writes to:

```text
examples/mcp-demo/.runwise/
```

and is ignored by git.

## Documentation Fixes Made

- Clarified that `npx -y pnpm@9.15.4 ...` is the fallback when `corepack` is unavailable.
- Corrected the example-project `--cwd` output path in the own-project guide.
- Added a note that relative `--output` paths are resolved relative to the scanned `--cwd` project.

## Remaining Friction

- Some shells may not provide `corepack`, even when Node.js is available.
- Custom output directories such as `.runwise-mcp-demo/` are not ignored by default.
- The README quick start assumes `pnpm` is available; the clean install checklist provides the stricter `npx -y pnpm@9.15.4` path.
- GitHub Actions still shows a non-blocking Node.js 20 deprecation annotation from referenced actions.

## Recommended Next Action

Proceed to Phase 11I only after confirming the main repo checks and GitHub Actions are green. Keep npm publishing and release tagging deferred until an explicit release-candidate loop.
