# Decision Log

## D001: Use pnpm workspaces

Runwise starts as a pnpm monorepo so packages, apps, examples, and docs can evolve together while keeping package boundaries explicit.

## D002: Use TypeScript-first package shells

All runtime package entrypoints are TypeScript files in Phase 0. This keeps contracts typed before real scanning logic is introduced.

## D003: Keep Phase 0 free of hosted product behavior

Phase 0 does not include login, cloud services, billing, databases, or complex dashboard behavior. These are outside the foundation loop.

## D004: Use static HTML as the bridge report artifact

The static HTML report is the local-first bridge between CLI-generated evidence and the future Dashboard. It must remain self-contained, dependency-free, and openable without a dev server.

## D005: Use deterministic workspace check before root-wide TypeScript compilation

Until the TypeScript workspace strategy is revisited, the root quality gate uses `scripts/check-workspace.mjs` plus explicit package-level check scripts instead of relying on root-wide `tsc --noEmit`. The deterministic gate validates workspace shape, governance files, package entry files, package JSON parsing, TypeScript syntax/transpile health, and untracked `.runwise/` generated reports.

## D006: Keep the first Dashboard Viewer local and report-file based

The first Dashboard Viewer is a local HTTP viewer for `.runwise/runwise-report.json`, not a hosted app or dashboard backend. It must avoid login, cloud sync, databases, external API calls, and SaaS assumptions while keeping the static HTML report as a separate shareable artifact.

## D007: Start GitHub Action as local-first composite action

Runwise GitHub Action starts as a local-first composite action using the same Doctor report artifacts instead of a hosted service or GitHub App. It runs in the repository workflow, writes a job summary and outputs, and applies configurable thresholds from the generated local report.

## D008: Start trace support with local JSON validation

Runwise trace schema starts as a lightweight JSON format with local validation before replay, eval generation, or observability integrations. The validator checks structure, step shape, timeline sanity, and risk/approval hints without storing traces, calling models, or introducing hosted trace infrastructure.

## D009: Keep Trace Replay static and local

Trace Replay is a static local interpretation of a validated trace, not a re-execution engine. It reads trace JSON, builds replay summaries, and writes Markdown artifacts without executing tools, re-running agents, calling models, generating eval cases, or storing traces in hosted infrastructure.

## D010: Start Failure-to-Eval as deterministic local generation

Failure-to-Eval starts as deterministic local eval case generation from validated traces, not as model-based eval execution. It writes reviewable JSON, YAML, and Markdown artifacts without executing evals, calling models, training models, re-running agents, executing tools, uploading datasets, or storing evals in hosted infrastructure.

## D011: Start ecosystem integration as local heuristic detection

Ecosystem integration starts as local heuristic detection and compatibility examples, not runtime framework execution. Runwise detects local files, package metadata, config names, environment example names, and example documentation without importing external AI frameworks, running models, calling external APIs, adding hosted integrations, or claiming official ecosystem partnerships.
