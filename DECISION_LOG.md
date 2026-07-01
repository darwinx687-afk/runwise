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

## D012: Launch from source before package or marketplace release

Runwise open-source launch uses local-first source installation and repository-based documentation before npm publishing or marketplace release. Public package names, release tags, and marketplace listings should be finalized only after repository setup and package metadata review.

## D013: Defer public release tags and npm publishing until repository verification

First public launch preparation keeps npm publishing and release tagging deferred until after the repository renders correctly and CI passes on GitHub.

## D014: Prepare first release candidate as v0.1.0-preview.0

First release candidate preparation uses `v0.1.0-preview.0`, with npm publishing and GitHub Marketplace release deferred until after tag and CI verification.

## D015: Create first preview as git tag only

`v0.1.0-preview.0` is created as a git tag only. GitHub Release and npm publishing remain deferred.

## D016: Prepare GitHub prerelease from existing preview tag

`v0.1.0-preview.0` GitHub Release will be created as a prerelease from the existing tag, while npm publishing remains deferred.

## D017: Create v0.1.0-preview.0 as GitHub prerelease only

`v0.1.0-preview.0` GitHub Release was created as a prerelease from the existing tag; npm publishing and Marketplace release remain deferred.

## D018: Keep post-release launch assets as draft materials

Post-release launch assets are prepared as draft sharing materials only; external posting remains a manual step.

## D019: Use GitHub Issues and bilingual docs for public launch feedback

Public launch feedback intake uses GitHub Issues, repository labels, and bilingual docs before adding any hosted feedback system.

## D020: Keep public launch execution manual

Public launch execution remains manual, with feedback collected through GitHub Issues and maintained through docs-based trackers before adding any analytics or hosted feedback system.

## D022: Prioritize first-time developer experience before new product capabilities

Phase 11 prioritizes first-time developer experience and understanding before adding new product capabilities.

## D023: Use curated samples instead of generated artifacts for first-time understanding

Runwise uses curated sample docs and SVG example cards for first-time understanding instead of committing generated `.runwise/` artifacts.

## D024: Polish local report readability before adding runtime capabilities

Runwise report polish focuses on self-contained local HTML and lightweight dashboard readability before adding new runtime capabilities.

## D025: Explore JSON rule packs before executable plugins

Runwise will explore local JSON rule packs before executable plugins, keeping plugin support local-first, reviewable, and safe.

## D026: Plan v0.1.1-preview.0 as usability and trust polish

`v0.1.1-preview.0` is planned as a usability and trust polish release, not a feature expansion or plugin implementation release.

## D027: Prioritize source-install clarity before npm publishing

v0.1.1 usability work prioritizes source-install clarity, user feedback quality, and first-run confidence before npm publishing.

## D028: Require clean-clone install review before the next preview tag

v0.1.1 release preparation requires a clean-clone install review before tagging a new preview release.
