# Architecture

Runwise uses a pnpm monorepo with TypeScript-first package boundaries.

## Workspace Layout

```text
apps/dashboard
apps/docs
packages/cli
packages/core
packages/schemas
packages/reporter
packages/integrations
packages/github-action
examples/mcp-demo
examples/rag-demo
examples/browser-agent-demo
examples/enterprise-workflow-demo
docs/en
docs/zh-CN
```

## Package Roles

- `@runwise/cli`: command-line entrypoint.
- `@runwise/core`: local project scanner, rule engine, scoring engine, trace validator, static trace replay builder, deterministic eval generator, and Doctor integration detection caller.
- `@runwise/schemas`: shared schema, rule, finding, scoring, report, trace, replay, eval case, and integration profile contracts.
- `@runwise/reporter`: JSON, YAML, Markdown, static HTML report, replay Markdown, and eval case formatting boundary.
- `@runwise/integrations`: local ecosystem profile and heuristic detection boundary.
- `@runwise/github-action`: GitHub Action boundary.
- `@runwise/dashboard`: local report-file dashboard viewer.

## Current Runtime

The current runtime behavior is:

- `runwise doctor`: scans the local project, runs structured readiness rules, detects local ecosystem compatibility signals, computes a readiness score, and writes JSON, Markdown, and static HTML reports under `.runwise/`.
- `runwise trace validate <path>`: validates a Runwise trace JSON file or a directory of trace JSON files locally.
- `runwise trace replay <trace-file>`: validates a trace file, builds a static replay summary, prints a terminal timeline, and writes Markdown under `.runwise/replays/`.
- `runwise eval generate <trace-file>`: validates a trace file, builds a deterministic Failure-to-Eval case, and writes JSON, YAML, and Markdown under `.runwise/evals/`.
- `runwise view`: starts a lightweight local HTTP viewer for `.runwise/runwise-report.json`.
- `action.yml`: runs Runwise Doctor in GitHub Actions, writes a job summary, sets outputs, and evaluates local threshold gates.

## Trace Schema and Validation

Runwise trace validation starts as a lightweight local JSON contract in `@runwise/schemas` with runtime validation in `@runwise/core`.

The trace schema is for AI Agent, MCP, RAG, and LLM application runs. It records run metadata, status, model/environment hints, and ordered steps such as LLM calls, tool calls, MCP tool calls, RAG retrieval, approval requests/responses, errors, and final output.

The validator checks required root fields, step fields, timeline sanity, error step shape, and high-risk tool calls without approval steps. Errors make a trace invalid; warnings provide guidance without blocking structurally usable traces.

`runwise trace validate` does not call external services, require API keys, write to `.runwise/`, run replay, generate evals, or store traces. Replay and Failure-to-Eval are separate explicit commands.

## Static Trace Replay

Trace Replay is a static local interpretation of a validated `runwise.agent_trace` JSON file. It reads the trace, summarizes the timeline, counts risk levels, reviews approval request/response flow, records error steps, and writes a Markdown replay report.

Replay output is written under `.runwise/replays/` by default and remains a reproducible local artifact. The command does not re-run agents, execute tools, call models, call external APIs, generate eval cases, or store traces in a hosted system.

## Failure-to-Eval

Failure-to-Eval is deterministic local eval case generation from a validated `runwise.agent_trace` JSON file. It reads the trace, derives a simple eval case type, expected behavior, prohibited behavior, assertions, and risk tags, then writes JSON, YAML, and Markdown artifacts.

Eval output is written under `.runwise/evals/` by default and remains a reproducible local artifact. The command does not execute evals, run model judges, call models, train models, re-run agents, execute tools, call external APIs, upload datasets, or store evals in a hosted system.

## Ecosystem Compatibility Detection

Ecosystem compatibility starts as local heuristic detection in `@runwise/integrations`. Profiles cover MCP, OpenAI Agents, LangChain, Dify, browser-use, Claude Code, Codex, Cursor, Windsurf, Ollama, OpenAI-compatible APIs, and China-ready LLM providers.

Detection uses only local file names, directory names, package metadata, environment example names, lightweight config files, and example documentation. It does not import or execute external AI frameworks, run models, call external APIs, add hosted integrations, or turn Runwise into an agent framework.

Doctor reports include a compact detected-ecosystem summary in JSON, Markdown, static HTML, and the local Dashboard Viewer. Compatibility examples under `examples/` are inert documentation and detection fixtures, not runnable AI apps.

## Future Plugin Direction

Plugin support is not implemented in the current public preview.

Today, Doctor rules are built into `@runwise/core`, and ecosystem profiles are built into `@runwise/integrations`. A possible future direction is to add local JSON rule packs first, so teams can add reviewable checks without changing Runwise core.

The first plugin MVP, if approved later, should avoid executable plugins. It should not run arbitrary JavaScript, call models, access the network, write files, auto-install packages, or replace the core Doctor engine.

Documentation-only plugin examples may live under `examples/plugins/`, but current Runwise does not load them.

## GitHub Action Readiness Check

The first GitHub Action is a root composite action. It uses the same local Doctor report artifacts as the CLI instead of a hosted service, GitHub App, cloud sync layer, database, or external API call.

The action flow is:

- Set up Node.js and pnpm.
- Install Runwise action dependencies from the action checkout.
- Run `runwise doctor --cwd <working-directory> --output <output-directory>`.
- Read `runwise-report.json`.
- Write `$GITHUB_STEP_SUMMARY` with the readiness score, rule summary, finding summary, report paths, and a short Chinese local-first note.
- Set action outputs for score, finding counts, blocking count, and report paths.
- Fail when configured thresholds are violated: `min-score`, `fail-on-blocking`, or `fail-on-severity`.

## Local Dashboard Viewer

The first Dashboard Viewer is a local report-file viewer in `apps/dashboard`. It uses Node's built-in `http` server and does not require a frontend build pipeline, hosted backend, database, login, cloud sync, or external API call.

The viewer serves fixed local routes:

- `/`: dashboard HTML rendered from `.runwise/runwise-report.json`.
- `/report.json`: the loaded Runwise report JSON.
- `/health`: simple local health JSON.
- `/runwise-report.md`: optional generated Markdown report if present.
- `/runwise-report.html`: optional generated static HTML report if present.

The static HTML report and Dashboard Viewer are separate artifacts:

- Static HTML report: shareable generated evidence under `.runwise/runwise-report.html`.
- Dashboard Viewer: interactive local viewer served by `runwise view` from the generated JSON report.

## Quality Gate

The root `pnpm check` command runs `scripts/check-workspace.mjs`. It is the deterministic workspace gate for the current phase and validates:

- Required workspace directories for apps, packages, examples, and bilingual docs.
- Required governance and bilingual README files.
- Required package entry files: `package.json`, `tsconfig.json`, and `src/index.ts`.
- Parseable package JSON files.
- TypeScript source syntax/transpile checks through the local esbuild dependency.
- No tracked generated `.runwise/` report artifacts.

The root `pnpm check:types` command runs the TypeScript syntax/transpile portion of the same gate directly.

Each package shell keeps a package-level `check` script using `tsc --noEmit -p tsconfig.json`. Package `tsconfig.json` files are isolated to `src/**/*.ts`; the repository does not yet use a root project-reference graph. In the current local path, root-wide `tsc --noEmit` has shown intermittent hangs, so it is not the root quality gate until the TypeScript workspace shape is revisited in a later phase.
